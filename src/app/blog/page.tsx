import { notFound, redirect } from 'next/navigation';
import styles from '@/app/products/Products.module.css';
import Layout from '@/components/layout/Layout';
import { GetBlogsResponse } from './blog.interface';
import Image from 'next/image';
import LoadMoreButton from '@/components/loadMoreButton/loadMoreButton';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';




export const metadata: object = {
    title: 'Блог',
    description: 'Блог про животных на нашем сайте!',
    openGraph: {
        title: 'Products',
        description: 'call',
    }
}

const fetchData = async (pageNumber: number) => {
    const response = await fetch(`https://vethome24.ru/wp-json/wp/v2/blog/?per_page=18&page=${pageNumber}`, {
        cache: 'force-cache',
    })

    const data = await response.json()
    return data as GetBlogsResponse
}

export default async function Uslugi() {
    const initialData = await fetchData(1);

    if (!initialData.length) notFound();

    return (
        <Layout>
            <h1 className='title'>Блог</h1>


            <ul className={styles.cards}>
                {initialData.map(item =>
                    <li key={item.id} className={styles.card}>
                        <a href={`/blog/${item.slug}`}>
                            <Image
                                className='image'
                                src={item.yoast_head_json.og_image[0].url}
                                alt={item.title.rendered}
                                width={320}
                                height={140}
                            />
                            <p>{item.title.rendered}</p>
                        </a>
                    </li>
                )}
            </ul>
     

            <LoadMoreButton initialData={initialData} />
        </Layout>
    )
}

