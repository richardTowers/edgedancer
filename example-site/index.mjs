import Koa from 'koa'
import KoaRouter from 'koa-router'
import axios from 'axios'
import {readFile} from 'fs/promises'

const port = parseInt(process.env['PORT'] || '3000', 10)
const app = new Koa()
const router = new KoaRouter()

router.get('random', '/random', async ctx => {
  const response = await axios({
    url: 'https://www.gov.uk/random',
    maxRedirects: 0,
    validateStatus: s => s === 302,
  })
  ctx.redirect(response.headers.location.replace('https://www.gov.uk/', `http://localhost:${port}/`))
})

router.get('wildcard', '(.*)', async ctx => {
  const [header, content, footer] = await Promise.all([
    readFile('static/header.html'),
    axios.get(`https://www.gov.uk/api/content${ctx.path}`)
      .then(r => r.data.details.body || 'oops - no content for this page')
      .then(b => `<main>${b}</main>`),
    readFile('static/footer.html'),
  ])
  ctx.type = 'text/html'
  ctx.body = Buffer.concat([header, Buffer.from(content), footer])
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(
  port,
  () => console.log(`Listening on ${port}`)
)

