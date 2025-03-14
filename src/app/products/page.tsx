
// import { useParams, usePathname, useRouter } from "next/navigation"
// import type { Metadata } from "next"
import {notFound, redirect} from 'next/navigation'
import { GetProductsResponse } from './products.interface'
import Layout from '@/components/layout/Layout'
import CategoryFilters from '@/components/category-filter/CategoryFilter';
import { Suspense } from 'react'; // Импортируем Suspense
import { ModeToggle } from '@/components/ToggleTheme/ToggleTheme';

// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query'

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

            

            <Suspense fallback={<p>Загрузка фильтров...</p>}> 
                <CategoryFilters serverProducts={data.products} />
            </Suspense>
            

            {/* <div className="chips">
                {[...new Set(data.products?.map(item => 
                    <div key={item.id} className='chip'>
                        <input className='checkbox-chip' type="checkbox" name="name" role='chip' id="" />
                        {item.category}
                    </div>
                ) )] }
            
               
            </div> */}

            
{/* 
            <ul className='cards'>
                {res}
            </ul> */}



            {/* <ul className='cards'>
                {data.products?.map( item => 
                    <li key={item.id} className='card'>
                        <p className='brand'>{item.brand}</p> 
                        <p>{item.category}</p> 
                        <p>{item.description}</p>
                        <p className='price'>{item.price} $</p>
                    </li>)}   
            </ul> */}



        </Layout>
    )
}