
// import { useParams, usePathname, useRouter } from "next/navigation"
// import type { Metadata } from "next"
import {notFound, redirect} from 'next/navigation'
import { GetProductsResponse } from './products.interface'
import Layout from '@/components/layout/Layout'

// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query'



// export const metadata: Metadata = {
//     title: 'Products',
//     description: 'call',
//     openGraph: {
//         title: 'Products',
//      description: 'call',
//     }
// }

export const metadata: object = {
    title: 'Products',
    description: 'call',
    openGraph: {
        title: 'Products',
        description: 'call',
    }
    
}



const fetchData = async () => {
    const response = await fetch('https://dummyjson.com/products',{ 
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    })

    //дал ии
    // if (!response.ok) {
    //     throw new Error('Failed to fetch data');
    // }

    const data = await response.json()
    // console.log(data)
    return data as GetProductsResponse;
}



export default async function Products() {

    // const {push} = useRouter()
    // push('products/1')

    // const pathname = usePathname()

    const data = await fetchData()

    if(!data) notFound()
        // let res = data.products?.map( item => {
        //     return <li key={item.id}>{item.brand}</li>;
        //  });
    // const params = useParams<{slug:string}>()

    // params.slug


    return(
        <Layout>
            <h1 className='title'>Продукты</h1>

            <ul className='cards'>
                {/* {res} */}
                {data.products?.map( item => 
                    <li key={item.id} className='card'>
                        <p className='brand'>{item.brand}</p> 
                        <p>{item.category}</p> 
                        <p>{item.description}</p>
                        <p className='price'>{item.price} $</p>
                    </li>)}   
            </ul>
        </Layout>
    )
}