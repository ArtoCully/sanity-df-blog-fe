const routes = (module.exports = require('next-routes')())

routes
  .add('index', '/')
  .add('blogs', '/blogs')
  .add('blog', '/blogs/:slug')
  .add('authors', '/authors')
  .add('author', '/authors/:slug')
