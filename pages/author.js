import React, { Fragment } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import { format } from 'date-fns'
import client from '../client'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

const Author = ({ name = 'No name', image = {}, bio = [], _updatedAt = '' }) => <div>
  <h1>
    <small>  Updated {format(_updatedAt, 'DD. MMMM, YYYY')}.</small>
    <br />
    {name}
  </h1>

  <div><img src={urlFor(image).width(50).url()} /></div>
  <BlockContent
    blocks={bio}
    imageOptions={{w: 320, h: 240, fit: 'max'}}
    projectId={client.clientConfig.projectId}
    dataset={client.clientConfig.dataset}
  />
  <Link prefetch href="/"><a>Back to home</a></Link>
</div>

Author.getInitialProps = async ({ query: { slug } }) => {
  return await client.fetch(`*[slug.current == $slug][0]{
    name,
    image,
    bio,
    _updatedAt
  }`, { slug })
}

export default Author