import React, { Fragment } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import Layout from '../components/Layout'
import client from '../client'

const pageQuery = `*[_type == "post"][0..1000]{
  _id,
  title,
  "slug": slug.current,
  _updatedAt
}
`

class Blogs extends React.Component {
  static async getInitialProps() {
    return {
      posts: await client.fetch(pageQuery)
    }
  }

  static defaultProps = {
    posts: []
  }

  render() {
    const { posts } = this.props

    return (
      <Layout>
        <div>
          <h2>Posts</h2>
          <ul>
            {posts && posts.map(
              ({ _id, title, slug, _updatedAt }) =>
                slug && (
                  <li key={`${_id}_posts`}>
                    <Link prefetch href={`/blogs/${slug}`}>
                      <a>{title}</a>
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

export default Blogs
