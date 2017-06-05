const express = require('express')
const morgan = require('morgan');
const app = express()

// templates
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')

// middleware
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/dist`))
app.use((req, res, next) => {
    console.log('my custom middleware')
    next()
})

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

app.get('/template', (req, res) => {
    res.render('index', {title: 'hello ejs'})
})

app.listen(3000)
console.log('server starting...')