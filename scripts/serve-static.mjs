import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), '.output', 'public')
const host = process.env.HOST || '0.0.0.0'
const port = Number(process.env.PORT || 4444)

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const resolvePath = (requestUrl) => {
  const pathname = new URL(requestUrl ?? '/', 'http://localhost').pathname
  const targetPath = pathname === '/' ? '/index.html' : pathname
  const normalized = normalize(targetPath).replace(/^(\.\.[/\\])+/, '')
  return join(root, normalized)
}

createServer(async (req, res) => {
  try {
    const target = resolvePath(req.url ?? '/')
    const file = await readFile(target)
    const extension = extname(target)

    res.writeHead(200, {
      'Content-Type': contentTypes[extension] ?? 'application/octet-stream',
    })
    res.end(file)
  } catch {
    try {
      const fallback = await readFile(join(root, '404.html'))
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      res.end(fallback)
    } catch {
      res.writeHead(404)
      res.end('Not found')
    }
  }
}).listen(port, host, () => {
  console.log(`Static preview running at http://${host}:${port}`)
})
