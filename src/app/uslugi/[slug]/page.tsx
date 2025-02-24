import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import styles from '@/app/products/Products.module.css';
import { GetServicesResponse } from '../uslugi.interface';

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

    fetchChildren(id)

    // console.log(id)
    return data[0]; // Предполагаем, что API возвращает массив с одним элементом
    
};


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






export default async function ServicePage({ params }: { params: Promise<{ slug: string, id: number }> }) {
    const { slug } = await params;
    const service = await fetchServiceBySlug(slug);
    const serviceChildren = await fetchChildren(service.id);



    // console.log(service)


    if (!service) {
        notFound(); // Если услуга не найдена, показываем 404
    }

    return (
        <Layout>
            <h1 className='title'>{service.title.rendered}</h1>
            <a href="/uslugi">Назад</a>

                <ul className={styles.cards}>
                    {serviceChildren.map( item => 
                        <li key={item.id} className={styles.card}>
                            <a href={`/uslugi/${item.slug}`}>
                                {item.title.rendered}
                                </a> 
                        </li>)}   
                </ul>

                           
                <div dangerouslySetInnerHTML={{ __html: service.acf.o_vrache }} />

                <div dangerouslySetInnerHTML={{ __html: service.acf.spoiler }} />

                <div dangerouslySetInnerHTML={{ __html: service.acf.table }} />

                <div dangerouslySetInnerHTML={{ __html: service.acf.tekst_uslugi }} />


            <div className={styles.content}>

            </div>
        </Layout>
    );
}
