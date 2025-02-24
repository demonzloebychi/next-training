// 'use client'

// import React from 'react';
// import { useState, useEffect } from 'react';
// import Layout from '../layout/Layout';

// const BlogMore = () => {
//     const [blogEl, setBlogEl] = useState([]);
//     const [offset, setOffset] = useState(0);



//     const BLOG_URL = 'https://vethome24.ru/wp-json/wp/v2/blog/'
//     const PER_PAGE = 12;


//     const fetchData = async () => {
//         const response = await fetch(`${BLOG_URL}?per_page=${PER_PAGE}&offset=${offset}`)
    
//         const newPosts = await response.json()
//         // setBlogEl([...blogEl, ...newPosts])
//         setOffset(offset + 12)
//         return newPosts;
//     }
    
//     const handleShowMore = () => {
//         fetchData();
//     }

//     // let allServices: GetServicesResponse = [];
//     // let offset = 0;
//     // let hasMore = true;

//     // while (hasMore){
//     //     const response = await fetch(`${SERVICES_URL}?per_page=${PER_PAGE}&offset=${offset}`,{ 
//     //         cache: 'force-cache',
//     //         next: {
//     //             revalidate: 3600,
//     //         }
//     //     });

//     //     if (!response.ok) {
//     //         throw new Error(`HTTP error! status: ${response.status}`);
//     //     }

//     //     const data: GetServicesResponse = await response.json();


//     //     if(data.length > 0) {
//     //         allServices = allServices.concat(data);
//     //         offset += PER_PAGE;
//     //     } else {
//     //         hasMore = false;
//     //     }

//     // }

//     // return allServices;



//     return (
//         <Layout>
            
//         </Layout>
//     );
// }

// export default BlogMore;
