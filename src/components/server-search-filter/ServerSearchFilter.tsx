
// components/SearchFilter.tsx
'use client'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'

interface BlogPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  yoast_head_json: {
    og_image: Array<{
      url: string
    }>
  }
}

interface BlogPostWithUrl {
  text: string;
  url: string;
}

const ServerSearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [filteredParagraphs, setFilteredParagraphs] = useState<BlogPostWithUrl[]>([])

  // Функция для получения всех статей из API
  const fetchAllPosts = async () => {
    try {
      const response = await fetch('https://vethome24.ru/wp-json/wp/v2/blog/?per_page=100', { // Увеличьте per_page, чтобы получить больше записей за один запрос
        cache: 'force-cache',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const data: BlogPost[] = await response.json()
      setAllPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  useEffect(() => {
    fetchAllPosts() // Получаем все статьи при монтировании компонента
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Фильтруем все статьи, а не только те, что были на странице
    const results = allPosts.map(post => ({
      text: post.title.rendered.replace(/<\/?[^>]+(>|$)/g, ''),
      url: `/blog/${post.slug}`,
    })).filter(post =>
      post.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredParagraphs(results)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="filter">
        <input
          className="input filter-input"
          id="filter-input"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className='btn' type="submit">Search</button>
      </form>

      <ul className='filter-response'>
        {filteredParagraphs.length > 0 ? (
          filteredParagraphs.map((paragraph, index) => (
            <li key={index}>
              <a href={paragraph.url}>{paragraph.text}</a>
            </li>
          ))
        ) : (
          <li> </li>
        )}
      </ul>
    </>
  )
}

export default ServerSearchFilter