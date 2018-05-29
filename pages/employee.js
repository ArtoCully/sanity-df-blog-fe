import React, { Fragment } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import { format } from 'date-fns'
import Layout from '../components/Layout'
import client from '../client'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

const pageQuery = `*[slug.current == $slug][0]{
  name,
  position,
  image,
  bio,
  _updatedAt
}`

const Employee = ({ name = 'No name', position = '', image = {}, bio = [], _updatedAt = '' }) => <Layout><div>
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
</div></Layout>

Employee.getInitialProps = async ({ query: { slug } }) => {
  return await client.fetch(pageQuery, { slug })
}

export default Employee