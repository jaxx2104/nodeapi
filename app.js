const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session')
const cookieParser   = require('cookie-parser')
const csrf = require('csurf')
const app = express()

// templates
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/dist`))
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'session secret',
    resave: false,
    saveUninitialized: false
}));
app.use(csrf());
app.use((req, res, next) => {
    console.log('my custom middleware')
    next()
})

app.param('id', (req, res, next, id) => {
    const users = ['zero', 'one', 'two', 'three']
    req.params.name = users[id]
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
    // res.send(`item no: ${req.params.id}`)
    res.send(`item no: ${req.params.id}, name: ${req.params.name}`)
})

app.get('/file', (req, res) => {
    res.sendFile(`${__dirname}/dist/hello.json`)
})

app.get('/user', (req, res) => {
    res.render('index', {title: 'hello ejs', username: 'sample'})
})

app.post('/user', (req, res) => {
    var username = req.param('username');
    if (username) {
        res.render('index', {title: 'Express Sample', username: username});
    } else {
        res.render('error', {title: 'Express Sample', error: 'Unknown username or password.'});
    }
})

app.listen(3000)
console.log('server starting...')