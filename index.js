require('dotenv').config()
const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT

app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
})); app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/cadastrar', (req,res)=>{
    res.render('cadastro')
})

app.get('/users', (req,res)=>{
    res.render('users')
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})