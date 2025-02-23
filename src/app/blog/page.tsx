import {notFound, redirect} from 'next/navigation'
import styles from '@/app/products/Products.module.css'
import Layout from '@/components/layout/Layout'
import { GetBlogsResponse } from './blog.interface'
import Image from 'next/image'



export const metadata: object = {
    title: 'Блог',
    description: 'Блог о заболеваниях на нашем сайте!',
    openGraph: {
        title: 'Products',
        description: 'call',
    }
    
}


const fetchData = async () => {
    const response = await fetch('https://vethome24.ru/wp-json/wp/v2/blog/?per_page=12',{ 
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    })

    const data = await response.json()
    return data as GetBlogsResponse
}



export default async function Uslugi() {

    const data = await fetchData()

    if(!data) notFound()

    return(
        <Layout>
            <h1 className={styles.title}>Блог</h1>

            <ul className={styles.cards}>
                {data.map( item => 
                    <li key={item.id} className={styles.card}>
                        <a href={`/blog/${item.slug}`}>
                            {/* <img 
                                src={item.yoast_head_json.og_image[0].url}
                                alt={item.title.rendered} 
                            /> */}
                            <Image 
                                className='image'
                                src={item.yoast_head_json.og_image[0].url}
                                alt={item.title.rendered} 
                                width={320}
                                height={140}
                            />
                            {item.title.rendered}
                        </a> 
                    </li>)}   
            </ul>

            <button className={styles.showMoreBtn}>Показать еще</button>

        </Layout>
    )
}