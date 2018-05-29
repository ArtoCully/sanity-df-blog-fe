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

const pageQuery = `*[_type == "employee"][0..1000]{
  _id,
  name,
  position,
  "slug": slug.current,
  _updatedAt,
  image
}
`

class About extends React.Component {
  static async getInitialProps() {
    return {
      employees: await client.fetch(pageQuery)
    }
  }

  static defaultProps = {
    employees: []
  }

  render() {
    const { employees } = this.props

    return (
      <Layout>
        <div>
          <h2>Employees</h2>
          <ul>
            {employees && employees.map(
              ({ _id, name = '', position = '', slug = '', _updatedAt = '', image = {} }) =>
                slug && (
                  <li key={`${_id}_employees`}>
                    <Link prefetch href={`/about/employees/${slug}`}>
                      <a> <img src={urlFor(image).width(50).url()} /> {name} - {position}</a>
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

export default About