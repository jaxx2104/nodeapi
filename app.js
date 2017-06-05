const express = require('express')
app = express()

app.use(express.static(`${__dirname}/dist`))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/users/:name?', (req, res) => {
    if (!req.params.name) {
        res.send(`hello, nobody!`)
    } else {
        res.send(`hello, ${req.params.name}!`)
    }
})

app.get('/items/:id([0-9]+)', (req, res) => {
    res.send(`item no: ${req.params.id}`)
})

app.get('/file', (req, res) => {
    res.sendFile(`${__dirname}/dist/hello.json`)
})

app.listen(3000)
console.log('server starting...')