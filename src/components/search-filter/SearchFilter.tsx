// // components/SearchFilter.tsx
// 'use client'
// import React, { useState, ChangeEvent, FormEvent } from 'react'

// interface BlogPostWithUrl {
//   text: string;
//   url: string;
// }

// interface SearchFilterProps {
//   paragraphs: BlogPostWithUrl[]
// }

// const SearchFilter = ({ paragraphs }: SearchFilterProps) => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filteredParagraphs, setFilteredParagraphs] = useState<BlogPostWithUrl[]>([])

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value)
//   }

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const results = paragraphs.filter(paragraph =>
//       paragraph.text.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     setFilteredParagraphs(results)
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="filter flex flex-col items-start gap-3 mb-5">
//         <input
//           className="input filter-input"
//           id="filter-input"
//           value={searchTerm}
//           onChange={handleChange}
//         />
//         <button className='btn' type="submit">Search</button>
//       </form>

//       <ul className='mb-5'>
//         {filteredParagraphs.length > 0 ? (
//           filteredParagraphs.map((paragraph, index) => (
//             <li key={index}>
//               <a href={paragraph.url}>{paragraph.text}</a>
//             </li>
//           ))
//         ) : (
//           <li></li>
//         )}
//       </ul>
//     </>
//   )
// }

// export default SearchFilter



