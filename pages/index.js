import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const Index = ({ posts = [], authors = [] }) => (
  <div>
    <h1>Home</h1>
    <h2>Posts</h2>
    <ul>
      {posts.map(
        ({ _id, title = '', slug = '', _updatedAt = '' }) =>
          slug && (
            <li key={`${_id}_posts`}>
              <Link prefetch href={`/blog/${slug}`}>
                <a>{title}</a>
              </Link>{' '}
              ({format(_updatedAt, 'DD. MMMM, YYYY')})
            </li>
          )
      )}
    </ul>

    <h2>Authors</h2>
    <ul>
      {authors.map(
        ({ _id, name = '', slug = '', _updatedAt = '', image = {} }) =>
          slug && (
            <li key={`${_id}_authors`}>
              <Link prefetch href={`/author/${slug}`}>
                <a> <img src={urlFor(image).width(50).url()} /> {name}</a>
              </Link>{' '}
              ({format(_updatedAt, 'DD. MMMM, YYYY')})
            </li>
          )
      )}
    </ul>
  </div>
)

Index.getInitialProps = async () => {
  return {
    posts: await client.fetch(`*[_type == "post"][0..1000]{
      _id,
      title,
      "slug": slug.current,
      _updatedAt
    }`),
    authors: await client.fetch(`*[_type == "author"][0..1000]{
      _id,
      name,
      "slug": slug.current,
      _updatedAt,
      image
    }`)
  }
}

export default Index
