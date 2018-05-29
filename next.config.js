const client = require('./client')

module.exports = {
  exportPathMap: async function (defaultPathMap) {
    const path = await client
      .fetch('*[_type == "post"].slug.current')
      .then(data =>
        data.reduce(
          (acc, slug) => ({
            '/': { page: '/' },
            '/blogs': { page: '/blogs' },
            '/authors': { page: '/authors' },
            ...acc,
            [`/blogs/${slug}`]: { page: '/blogs', query: { slug } }
          }),
          {}
        )
      )
      .catch(console.error)
    
    console.log('path')
    console.log(path)
    return path
  }
}
