/* eslint-disable no-console */
const path = require('path')
const express = require('express')
const opn = require('opn')
const http = require('http')
const compression = require('compression')
const config = require('../config')
const webpackConfig = require('../webpack.config.prod')

const port = 4040
const server = express()
const root = path.join(__dirname, '../../../dist')

server.use(require('connect-history-api-fallback')())

server.use(compression())

server.use(webpackConfig.output.publicPath, express.static(root))

server.get('*', (req, res) => {
  res.sendFile(path.join(root, './index.html'))
})

const uri = `${config.devServer.useHttps ? 'https' : 'http'}://localhost:${port}`

console.log(`> Listening at ${uri}\n`)

const onServerRunning = (err) => {
  if (err) {
    console.log(err)
    return
  }

  opn(uri)
}

if (config.devServer.useHttps) {
  //
} else {
  http.createServer(server).listen(port, onServerRunning)
}
