// app/products/uslugi/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import styles from '@/components/layout/Layout.module.css';

import type { Metadata, ResolvingMetadata } from 'next'



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
    const blogArticle = await fetch(`https://vethome24.ru/wp-json/wp/v2/blog/?slug=${slug}`).then((res) => res.json())

    console.log(blogArticle[0].yoast_head_json.title)

   
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: blogArticle[0].yoast_head_json.title,
      description: blogArticle[0].yoast_head_json.description,
    //   openGraph: {
    //     images: ['/some-specific-page-image.jpg', ...previousImages],
    //   },
    }
  }
   
 


const fetchBlogBySlug = async (slug: string) => {
    const response = await fetch(`https://vethome24.ru/wp-json/wp/v2/blog/?slug=${slug}`, {
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    });

    if (!response.ok) {
        return null; // Обработка ошибок
    }

    const data = await response.json();
    // console.log(data[0])
    return data[0]; // Предполагаем, что API возвращает массив с одним элементом
};









export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await fetchBlogBySlug(slug);

    if (!service) {
        notFound(); // Если услуга не найдена, показываем 404
    }



    return (
        <Layout>
            <h1 className={styles.title}>{service.title.rendered}</h1>
            <a className={styles.buttonBack} href="/blog">Назад</a>
            <div className={styles.content}>
                {/* Здесь можно отобразить содержимое услуги */}
                <div dangerouslySetInnerHTML={{ __html: service.content.rendered }} />
            </div>
        </Layout>
    );
}




// type Props = {
//     params: Promise<{ slug: string }>
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
//   }
   
//   export async function generateMetadata(
//     { params, searchParams }: Props,
//     parent: ResolvingMetadata
//   ): Promise<Metadata> {
//     // read route params
//     const slug = (await params).slug
   
//     // fetch data
//     const blogArticle = await fetch(`https://vethome24.ru/wp-json/wp/v2/blog/?slug=${slug}`).then((res) => res.json())


//     const headTitle = blogArticle.yoast_head_json.title
//     console.log(headTitle)

   
//     // optionally access and extend (rather than replace) parent metadata
//     const previousImages = (await parent).openGraph?.images || []
   
//     return {
//       title: blogArticle.title,
//       openGraph: {
//         images: ['/some-specific-page-image.jpg', ...previousImages],
//       },
//     }
//   }

 

//   export default function Page({ params, searchParams }: Props) {}
