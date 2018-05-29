import React, { Fragment } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import Layout from '../components/Layout'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const pageQuery = `*[_type == "author"][0..1000]{
  _id,
  name,
  "slug": slug.current,
  _updatedAt,
  image
}
`

class Authors extends React.Component {
  static async getInitialProps() {
    return {
      authors: await client.fetch(pageQuery)
    }
  }

  static defaultProps = {
    authors: []
  }

  render() {
    const { authors } = this.props

    return (
      <Layout>
        <div>
          <h2>Authors</h2>
          <ul>
            {authors && authors.map(
              ({ _id, name = '', slug = '', _updatedAt = '', image = {} }) =>
                slug && (
                  <li key={`${_id}_authors`}>
                    <Link prefetch href={`/authors/${slug}`}>
                      <a> <img src={urlFor(image).width(50).url()} /> {name}</a>
                    </Link>{' '}
                    ({format(_updatedAt, 'DD. MMMM, YYYY')})
                  </li>
                )
            )}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default Authors
