import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { GetServicesResponse } from '../uslugi.interface';
import styles from '@/components/layout/Layout.module.css';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next'


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';




type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
   
  export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const slug = (await params).slug
   
    // fetch data
    const serviceItem = await fetch(`https://clinical.vet/wp-json/wp/v2/uslugi/?slug=${slug}`).then((res) => res.json())

    // console.log(serviceItem[0].yoast_head_json.title)

   
    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: serviceItem[0].yoast_head_json.title,
      description: serviceItem[0].yoast_head_json.description,
    //   openGraph: {
    //     images: ['/some-specific-page-image.jpg', ...previousImages],
    //   },
    }
  }

  let externalMessage: string;


const fetchServiceBySlug = async (slug: string) => {
    const response = await fetch(`https://clinical.vet/wp-json/wp/v2/uslugi?slug=${slug}`, {
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    });

    if (!response.ok) {
        return null; // Обработка ошибок
    }

    const data = await response.json();
    const id = data[0].id
    const photoId = data[0].acf.osnovnoe_foto_vrach


    // const responsePhoto = await fetch(`https://clinical.vet/wp-json/wp/v2/media/${photoId}`)

    // const dataPhoto = await response.json();
    // const photoUrl = dataPhoto.source_url; // Это URL фотографии


    fetchPhotoServiceBySlug(photoId)
    fetchChildren(id)


    
    // console.log(data[0])
    return data[0]; // Предполагаем, что API возвращает массив с одним элементом
    
};



const fetchPhotoServiceBySlug = async (photoId: number) => {
    const response = await fetch(`https://clinical.vet/wp-json/wp/v2/media/${photoId}`)

        const data = await response.json();
        const photoUrl = data.source_url; // Это URL фотографии
        // console.log(photoUrl);

    return photoUrl
}




const fetchChildren = async(id: number) => {
    
    const responseChildren = await fetch(`https://clinical.vet/wp-json/wp/v2/uslugi?parent=${id}`, {
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    });

    // if (!response.ok) {
    //     return null; // Обработка ошибок
    // }

    const dataChildren = await responseChildren.json();
    // console.log(dataChildren)

    return dataChildren as GetServicesResponse;
}




export default async function ServicePage({ params }: { params: Promise<{ slug: string, id: number, photoUrl: number }> }) {
    const { slug } = await params;
    const service = await fetchServiceBySlug(slug);

    const photoService = await fetchPhotoServiceBySlug(service.acf.osnovnoe_foto_vrach)

    const serviceChildren = await fetchChildren(service.id);



    // console.log(service)


    if (!service) {
        notFound(); // Если услуга не найдена, показываем 404
    }

    return (
        <Layout>

        <h1 className='title'>{service.title.rendered}</h1>
        <a className='buttonBack' href="/uslugi">Назад</a>

             <div className="ss-banner">

                <div className="ss-banner__left">
                    

                    <div className="ss-banner__img">
                        <Image
                            className='image'
                            src={photoService}
                            alt={service.title.rendered}
                            width={320}
                            height={140}
                        />
                    </div>
                </div>

                <div className="ss-banner__right">
                    

                    <div dangerouslySetInnerHTML={{ __html: service.acf.o_vrache }} />
                </div>

             </div>

                


                
                <ul className='cards'>
                    {serviceChildren.map( item => 
                        <li key={item.id} className='card'>
                            <a href={`/uslugi/${item.slug}`}>
                                {item.title.rendered}
                                </a> 
                        </li>)}   
                </ul>
                



               


                <div className="price">
                    <div className="price__list">
                        <div dangerouslySetInnerHTML={{ __html: service.acf.table }} />
                    </div>

                </div>
        


                <div className={styles.content}>
                    <div dangerouslySetInnerHTML={{ __html: service.acf.tekst_uslugi }} />
                </div>

                           
                <div className='spoiler' dangerouslySetInnerHTML={{ __html: service.acf.spoiler }} />


                {/* <div dangerouslySetInnerHTML={htmlMarkup} /> */}
                


            <div className={styles.content}>

            </div>
        </Layout>
    );
}



// interface PhotoData {
//     /**
//      * The alternative text for the image.
//      */
//     alt_text: string;
//     /**
//      * The ID of the attachment.
//      */
//     id: number;
//     /**
//      * The media type of the attachment.
//      */
//     media_type: string;
//     /**
//      * Details about the media file, such as its height, width, and available sizes.
//      */
//     media_details: {
//       width: number;
//       height: number;
//       file: string;
//       filesize: number;
//       mime_type: string;
//       /**
//        * Available image sizes and their details.
//        */
//       sizes: {
//         thumbnail?: {
//           file: string;
//           width: number;
//           height: number;
//           mime_type: string;
//           source_url: string;
//         };
//         medium?: {
//           file: string;
//           width: number;
//           height: number;
//           mime_type: string;
//           source_url: string;
//         };
//         medium_large?: {
//           file: string;
//           width: number;
//           height: number;
//           mime_type: string;
//           source_url: string;
//         };
//         large?: {
//           file: string;
//           width: number;
//           height: number;
//           mime_type: string;
//           source_url: string;
//         };
//         full: {
//           file: string;
//           width: number;
//           height: number;
//           mime_type: string;
//           source_url: string;
//         };
//       };
//     };
//     /**
//      * The MIME type of the attachment.
//      */
//     mime_type: string;
//     /**
//      * The URL of the attachment's source file.
//      */
//     source_url: string;
//   }
  



// function parseHtmlRegex(htmlString: string): { title: string; text: string }[] {
//     const regexTitle = /<div class="spoiler__title">(.*?)<\/div>/g;
//     const regexText = /<div class="spoiler__text">(.*?)<\/div>/g;
    
//     const titles: string[] = [];
//     let match;
    
//     while ((match = regexTitle.exec(htmlString)) !== null) {
//         titles.push(match[1]);
//     }
    
//     const texts: string[] = [];
//     while ((match = regexText.exec(htmlString)) !== null) {
//         texts.push(match[1]);
//     }
    
//     return titles.map((title, index) => ({ title, text: texts[index] }));
// }


// const parsedData = parseHtmlRegex(htmlContent);
// console.log(parsedData);






// const externalMessage: string;
// Пример использования
// const htmlContent = `
// <div class="spoiler-item">
// <div class="spoiler__title">Заголовок 1</div>
// <div class="spoiler__text">Текст 1</div>
// </div>
// <div class="spoiler-item">
// <div class="spoiler__title">Заголовок 2</div>
// <div class="spoiler__text">Текст 2</div>
// </div>
// `;

// const htmlContent = data[0].acf.spoiler





