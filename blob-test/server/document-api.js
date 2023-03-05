const express = require('express')
const fs = require('fs').promises
const path = require('path')
const app = express()


app.use(express.static(path.join(__dirname, '../client')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/document', async function (req, res) {
    req.query.type
    let data
    let type
    switch(req.query.type){
        case 'pdf':
            data = await fs.readFile(path.join(__dirname,'./data/yeeee.pdf'))
            type = 'application/pdf'
            break;
        case 'doc':
            data = await fs.readFile(path.join(__dirname,'./data/sad-kit.doc'))
            type = 'application/msword'
            break;
        default:
            type = 'image/jpeg'
            data = await fs.readFile(path.join(__dirname,'./data/404.jpg'))
    }
    const buffer = Buffer.from(data)
    res.setHeader('Content-Type',type)
    res.send(buffer)
})

app.get('/doc', function (req, res) {
    res.send('Hello World')
  })

var server = app.listen(8081)

