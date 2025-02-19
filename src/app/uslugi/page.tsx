import {notFound, redirect} from 'next/navigation'
import styles from '@/app/products/Products.module.css'
import Layout from '@/components/layout/Layout'
import { GetUslugiResponse } from './uslugi.interface'

export const metadata: object = {
    title: 'Услуги',
    description: 'call',
    openGraph: {
        title: 'Products',
        description: 'call',
    }
    
}




const fetchData = async () => {
    const response = await fetch('https://clinical.vet//wp-json/wp/v2/uslugi/?per_page=100',{ 
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    })



    const data = await response.json()
    console.log(data[0])
    return data as GetUslugiResponse;
}



export default async function Uslugi() {



    const data = await fetchData()

    if(!data) notFound()

    



    return(
        <Layout>
            <h1 className={styles.title}>Услуги</h1>

            <ul className={styles.cards}>
                {data.map( item => 
                    <li key={item.id} className={styles.card}>
                        <a href={`/uslugi/${item.slug}`}>
                            {item.title.rendered}
                            </a> 
                    </li>)}   
            </ul>

            
       

           
        </Layout>
    )
}