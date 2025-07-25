// app/[city]/uslugi/[...slugSegments]/page.tsx

import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import styles from '@/components/layout/Layout.module.css';
import AccordionBlock from '@/components/accordion/AccordionBlock'
import type { Metadata, ResolvingMetadata } from 'next'


type Service = {
  id: number;
  slug: string;
  title: { rendered: string };
  parent: number;
  acf?: {
    osnovnoe_foto_vrach?: number;
    tekst_uslugi?: string;
    o_vrache?: string;
    table?: string;
    spoiler?: string;
  };
};

type Params = {
  city: string;           // из динамического сегмента [city]
  slugSegments: string[]; // из catch-all сегмента [...slugSegments]
};






   
async function fetchServiceBySlug(slug: string): Promise<any | null> {
  const res = await fetch(`https://clinical.vet/wp-json/wp/v2/uslugi?slug=${slug}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data?.length) return null;
  return data[0];
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slugSegments } = await params;
  const slugs = slugSegments || [];

  if (slugs.length === 0) {
    return {
      title: 'Услуги',
      description: 'Описание услуг клиники',
    };
  }

  const currentSlug = slugs[slugs.length - 1];
  const service = await fetchServiceBySlug(currentSlug);
  if (!service) {
    return {
      title: 'Услуга не найдена',
      description: 'Данная услуга отсутствует',
    };
  }

  // Получаем предыдущие изображения из родительских метаданных (если нужно)
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: service.yoast_head_json?.title || service.title.rendered || 'Услуга',
    description:
      service.yoast_head_json?.description ||
      (service.acf?.tekst_uslugi
        ? service.acf.tekst_uslugi.replace(/<[^>]+>/g, '').slice(0, 160)
        : 'Описание услуги'),
    openGraph: {
      images: service.yoast_head_json?.og_image
        ? [service.yoast_head_json.og_image[0]?.url, ...previousImages]
        : previousImages,
    },
  };
}







// // Получить услугу по slug
// async function fetchServiceBySlug(slug: string): Promise<Service | null> {
//   const res = await fetch(`https://clinical.vet/wp-json/wp/v2/uslugi?slug=${slug}`, {
//     cache: 'force-cache',
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) return null;
//   const data: Service[] = await res.json();
//   if (!data?.length) return null;
//   return data[0];
// }

// Получить дочерние услуги
async function fetchChildren(parentId: number): Promise<Service[]> {
  const res = await fetch(`https://clinical.vet/wp-json/wp/v2/uslugi?parent=${parentId}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data: Service[] = await res.json();
  return data;
}

// Получить URL фото по id медиа
async function fetchPhotoById(photoId: number): Promise<string | null> {
  const res = await fetch(`https://clinical.vet/wp-json/wp/v2/media/${photoId}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.source_url ?? null;
}












export default async function UslugiCatchAllPage({ params }: { params: Promise<{city: string, slugSegments: string[]; }> }) {
  const { city, slugSegments } = await params; // await обязательно для next.js 15+

  const slugs = slugSegments || [];

  if (slugs.length === 0) {
    return notFound();
  }

  // Получаем текущую услугу по последнему slug
  const currentSlug = slugs[slugs.length - 1];
  const service = await fetchServiceBySlug(currentSlug);
  if (!service) return notFound();

  // Проверка иерархии: если есть родитель, он должен совпадать со предпоследним slug
  if (service.parent) {
    const parentSlug = slugs.length >= 2 ? slugs[slugs.length - 2] : null;
    const parentService = parentSlug ? await fetchServiceBySlug(parentSlug) : null;

    if (!parentService || Number(service.parent) !== Number(parentService.id)) {
      return notFound();
    }
  } else if (slugs.length > 1) {
    // Если корневая услуга, но путь содержит вложенность — 404
    return notFound();
  }

  // Получаем дочерние услуги для текущей услуги
  const serviceChildren = await fetchChildren(service.id);

  // Получаем фото, если есть
  let photoUrl: string | null = null;
  if (service.acf?.osnovnoe_foto_vrach) {
    photoUrl = await fetchPhotoById(service.acf.osnovnoe_foto_vrach);
  }





    function parseHtmlRegex(htmlString: string): { title: string; text: string }[] {
        const regexTitle = /<div class="spoiler__title">(.*?)<\/div>/g;
        const regexText = /<div class="spoiler__text">(.*?)<\/div>/g;
        
        const titles: string[] = [];
        let match;
        
        while ((match = regexTitle.exec(htmlString)) !== null) {
            titles.push(match[1]);
        }
        
        const texts: string[] = [];
        while ((match = regexText.exec(htmlString)) !== null) {
            texts.push(match[1]);
        }
        
        return titles.map((title, index) => ({ title, text: texts[index] }));
    }

    
    const htmlContent = service.acf?.spoiler
    const parsedData = parseHtmlRegex(htmlContent || '');











  return (
    <Layout>
      <h1>{service.title.rendered}</h1>




              <a className='buttonBack' href="./">Назад</a>

             <div className="ss-banner">

                <div className="ss-banner__left">
                    

                    <div className="ss-banner__img">
                           {photoUrl && (
                              <Image
                                src={photoUrl}
                                alt={service.title.rendered}
                                width={320}
                                height={140}
                                className="image"
                              />
                            )}


                    </div>
                </div>

                {
                    service.acf?.o_vrache && (
                        <div className="ss-banner__right">
                            <div dangerouslySetInnerHTML={{ __html: service.acf?.o_vrache }} />
                        </div>
                    )
                        
                }

                

             </div>






        
   


      {serviceChildren.length > 0 && (
        <>
          <ul className="cards">
            {serviceChildren.map((child: Service) => {
              // Формируем полный путь к дочерней услуге
              const childPath = `/${city}/uslugi/${[...slugs, child.slug].join('/')}`;
              return (
                <li key={child.id} className="card">
                  <a href={childPath}>{child.title.rendered}</a>
                </li>
              );
            })}
          </ul>
        </>
      )}

               <div className="price">
                    <div className="price__list">
                        <div dangerouslySetInnerHTML={{ __html: service.acf?.table || '' }} />
                    </div>

                </div>





        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: service.acf?.tekst_uslugi || '' }} />
        </div>


                <div className="spoilers">
                    {
                        parsedData.map( item => 
                            <AccordionBlock key={item.title} title={item.title} text={item.text}  />
                        )
                    }

                </div>

      
    </Layout>
  );
}
