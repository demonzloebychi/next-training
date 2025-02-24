import {notFound, redirect} from 'next/navigation'
import styles from '@/app/products/Products.module.css'
import Layout from '@/components/layout/Layout'
import { GetServicesResponse } from './uslugi.interface'

export const metadata: object = {
    title: 'Услуги',
    description: 'Наши услуги!',
    openGraph: {
        title: 'Products',
        description: 'call',
    }
}



// const fetchData = async () => {
//     const response = await fetch('https://vethome24.ru/wp-json/wp/v2/blog/?parent=0',{ 
//         cache: 'force-cache',
//         next: {
//             revalidate: 3600,
//         }
//     })

//     const data = await response.json()
//     return data as GetServicesResponse;
// }





const fetchData = async () => {

    
    const SERVICES_URL = 'https://clinical.vet/wp-json/wp/v2/uslugi/';
    const PER_PAGE = 100;

    // let allServices: GetServicesResponse = [];
    // let offset = 0;
    // let hasMore = true;

    // while (hasMore){
    //     const response = await fetch(`${SERVICES_URL}?per_page=${PER_PAGE}&offset=${offset}`,{ 
    //         cache: 'force-cache',
    //         next: {
    //             revalidate: 3600,
    //         }
    //     });

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const data: GetServicesResponse = await response.json();


    //     if(data.length > 0) {
    //         allServices = allServices.concat(data);
    //         offset += PER_PAGE;
    //     } else {
    //         hasMore = false;
    //     }

    // }

    // return allServices;




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

        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }

        

        const data: GetServicesResponse = await response.json();

        // console.log(data)


        if (!data || data.length === 0) {
            notFound(); // или отобразите сообщение об ошибке
        }

        if(data.length > 0) {
            allServices = allServices.concat(data);
            page ++;
        } else {
            hasMore = false;
        }

    }

    return allServices;






    const response = await fetch('https://clinical.vet/wp-json/wp/v2/uslugi/?per_page=100',{ 
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    })

    const data = await response.json()
    // console.log(data)
    return data as GetServicesResponse;
}



export default async function Uslugi() {
    const data = await fetchData()

    const topLevelServices = data.filter(item => item.parent === 0);

    if(!data) notFound()

    return(
        <Layout>
            <h1 className={styles.title}>Услуги</h1>

            <ul className={styles.cards}>
                {topLevelServices.map( item => 
                    <li key={item.id} className={styles.card}>
                        <a href={`/uslugi/${item.slug}`}>
                            {item.title.rendered}
                            </a> 
                    </li>)}   
            </ul>
        </Layout>
    )
}