import { GetBlogsResponse } from "@/app/blog/blog.interface"

export const fetchData = async (pageNumber: number) => {
    const response = await fetch(`https://vethome24.ru/wp-json/wp/v2/blog/?per_page=18&page=${pageNumber}`, {
        cache: 'force-cache',
    })

    const data = await response.json()
    return data as GetBlogsResponse
}
