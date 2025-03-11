// components/category-filter/CategoryFilter.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import qs from 'query-string'

type Product = {
    id: number
    category: string
    brand?: string,
    description: string,
    price: number,
}

export default function CategoryFilters({ serverProducts }: { serverProducts: Product[] }) {
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    
    // Получаем уникальные категории
    const uniqueCategories = [...new Set(serverProducts.map(p => p.category))]
    
    // Инициализируем состояние из URL параметров
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        const categories = params.get('categories')?.split(',') || []
        setSelectedCategories(categories)
    }, [searchParams])

    // Обновляем URL при изменении категорий
    const updateCategories = (categories: string[]) => {
        const query = { 
            categories: categories.length ? categories.join(',') : null 
        }
        
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true })

        router.push(url, { scroll: false })
    }

    // Фильтруем продукты на клиенте
    const filteredProducts = selectedCategories.length 
        ? serverProducts.filter(p => selectedCategories.includes(p.category))
        : serverProducts

    return (
        <>
            <div className="chips">
                {uniqueCategories.map(category => (
                    <div key={category} className="chip">
                        <input
                            className='checkbox-chip'
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => {
                                const newCategories = selectedCategories.includes(category)
                                    ? selectedCategories.filter(c => c !== category)
                                    : [...selectedCategories, category]
                                
                                updateCategories(newCategories)
                            }}
                        />
                        {category}
                    </div>
                ))}
            </div>

            <ul className="cards">
                {filteredProducts.map(item => (
                    <li key={item.id} className="card">
                        <p className="brand">{item.brand}</p>
                        <p>{item.category}</p>
                        <p>{item.description}</p>
                        <p className="price">{item.price} $</p>
                    </li>
                ))}
            </ul>
        </>
    )
}
