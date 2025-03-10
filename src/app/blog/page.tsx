import { notFound, redirect } from 'next/navigation';
import styles from '@/app/products/Products.module.css';
import Layout from '@/components/layout/Layout';
import { GetBlogsResponse } from './blog.interface';
import Image from 'next/image';
import LoadMoreButton from '@/components/loadMoreButton/loadMoreButton';
//для поиска и фильтра на клиенте
// import SearchFilter from '@/components/search-filter/SearchFilter';
import ServerSearchFilter from '@/components/server-search-filter/ServerSearchFilter';


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
    // console.log(data)

    return data as GetBlogsResponse
}

//для поиска и фильтра на клиенте
// interface BlogPostWithUrl {
//     text: string;
//     url: string;
//   }
export default async function Uslugi() {
    const initialData = await fetchData(1);

    
    if (!initialData.length) notFound();




//для поиска и фильтра на клиенте
    // const paragraphData: BlogPostWithUrl[] = initialData.map(item => ({
    //     text: item.title.rendered.replace(/<\/?[^>]+(>|$)/g, ''), // Очистка HTML-тегов
    //     url: `/blog/${item.slug}`, // Формируем URL страницы
    //   }))



    return (
        <Layout>
            <h1 className='title'>Блог</h1>

            {//для поиска и фильтра на клиенте

            
            /* <SearchFilter paragraphs={paragraphData} /> */}
       
            <ServerSearchFilter />

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

