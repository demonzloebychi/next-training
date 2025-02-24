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
    console.log(data[0])
    return data[0]; // Предполагаем, что API возвращает массив с одним элементом
};


const fetchData = async () => {

    
    const SERVICES_URL = 'https://clinical.vet/wp-json/wp/v2/uslugi/';
    const PER_PAGE = 100;

    let allServices: GetServicesResponse = [];
    let page = 1;
    let hasMore = true;

    while (hasMore){
        const response = await fetch(`${SERVICES_URL}?per_page=${PER_PAGE}&page=${page}`,{ 
            cache: 'force-cache',
            next: {
                revalidate: 3600,
            }
        });     
        

        const data: GetServicesResponse = await response.json();




        if (!data || data.length === 0) {
            notFound(); // или отобразите сообщение об ошибке
        }

        if(data.length > 0) {
            allServices = allServices.concat(data);
            page ++;
        } else {
            hasMore = false;
        }


        // console.log(data)
    }

    return allServices;



}









export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await fetchServiceBySlug(slug);
    const data = await fetchData();


    const childrenServices = data.filter(item => item.parent === service.id);


    console.log(service)


    if (!service) {
        notFound(); // Если услуга не найдена, показываем 404
    }

    return (
        <Layout>
            <h1 className='title'>{service.title.rendered}</h1>
            <a href="/uslugi">Назад</a>

                <ul className={styles.cards}>
                    {childrenServices.map( item => 
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
