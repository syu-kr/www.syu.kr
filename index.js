const express = require('express')
const http = require('http')

const app = express()

app.use('/', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/index.html')
})

app.get('*', (req, res) => {
  res.status(404).json({ statusCode: 404, message: 'unknown request.' })
})

http.createServer(app).listen(4444, '0.0.0.0')
