"use client";
import { useState } from "react";
import Image from 'next/image';
import { GetBlogsResponse } from "@/app/blog/blog.interface";
import styles from '@/app/products/Products.module.css';
import { fetchData } from '@/api/api'

// Клиентский компонент для кнопки "Загрузить еще"
const LoadMoreButton = ({ initialData }: { initialData: GetBlogsResponse }) => {

    const [data, setData] = useState<GetBlogsResponse>(initialData);
    const [pageNumber, setPageNumber] = useState(2);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const handleLoadMore = async () => {
        const moreData = await fetchData(pageNumber);
        if (moreData.length) {
            setData([...data, ...moreData]);
            setPageNumber(pageNumber + 1);
            if (moreData.length < 18) setHasMorePosts(false);
        } else {
            setHasMorePosts(false);
        }
    }

    return (
        <>
    
            <ul className='cards'>
                {data.slice(initialData.length).map(item =>
                    <li key={item.id} className={styles.card}>
                        <a href={`/blog/${item.slug}`}>
                            <Image
                                className='image'
                                src={item.yoast_head_json.og_image[0].url}
                                alt={item.title.rendered}
                                width={320}
                                height={140}
                            />
                            {item.title.rendered}
                        </a>
                    </li>
                )}
            </ul>

            {hasMorePosts && (
                <button className='showMoreBtn' onClick={handleLoadMore}>
                    Загрузить еще
                </button>
            )}
        </>
    );
}
export default LoadMoreButton;
