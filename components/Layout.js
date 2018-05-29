import Head from 'next/head'
import Link from 'next/link'
import globalStyles from '../styles/global'
import styles from '../styles/layout'

export default props => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Sanity + Next.js Prototyping</title>
    </Head>
    <nav>
      <Link prefetch href={`/`}>
        <a>Home</a>
      </Link>
      <Link prefetch href={`/blogs`}>
        <a>Blogs</a>
      </Link>
      <Link prefetch href={`/authors`}>
        <a>Authors</a>
      </Link>
      <Link prefetch href={`/about`}>
        <a>About</a>
      </Link>
    </nav>
    <div id="main">
      {props.children}
    </div>
    <footer>
      <a>&copy; Footer 2018</a>
    </footer>
    <style jsx>{styles}</style>
    <style jsx global>{globalStyles}</style>
  </div>
)