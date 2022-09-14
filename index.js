require('dotenv').config()
const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT
const Person = require('./models/Person.js')
const session = require('express-session')
const { default: mongoose } = require('mongoose')

app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
})); app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

//Conf da session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cadastrar', (req, res) => {
    res.render('cadastro')
})

app.get('/users', async (req, res) => {

    var pessoa = []

    try {

    const people = await Person.find()

    if (people.length > 0){

        people.forEach(people => {
            pessoa.push({
                Nome: people.Nome,
                Qualificacao: people.Qualificacao,
                Tequi: people.Tequi,
                Produtividade: people.Produtividade,
                DisciplinaTotal: people.DisciplinaTotal,
                Total: people.Total
            })
        });


        res.render('users', { pessoas: pessoa })}

    } catch (error) {
        res.redirect('/')
    }

    res.render('users')
})

app.post('/cad', async (req, res) => {
    var dados = req.body

    if (dados.exp > 50) {
        dados.exp = 50
    }

    var TotalQuali = Math.round(((dados.grauF * 1) + (dados.grauM * 1) + (dados.grauS * 1) + (dados.preC * 10) + (dados.exp * 2) + (dados.hab * 10) + (dados.des * 10)) / 7)

    var TrabalhoEmEquipe = Math.round(((dados.Mequi * 20) + (dados.Mcomp * 20) + (dados.Mprod * 20)) / 3)

    var Produtividade = Math.round(((dados.Res * 1) + (dados.Metas * 1) + (dados.Satis * 10) + (dados.Quali * 1) + (dados.Ndemandas - 100) * -1 + (dados.Nerros - 100) * -1 + (dados.Naci -100)*-1) / 7)

    var DisciplinaTotal = Math.round(((dados.Presenca ) + ((dados.Natrasos - 100) * -1) + ((dados.Disciplina ) * 20)) / 3)

    var Total = (TotalQuali + TrabalhoEmEquipe + Produtividade + DisciplinaTotal) / 4

    var bd = {
        Nome: dados.nome,
        idade: dados.idade,
        grauF: dados.grauF,
        grauM: dados.grauM,
        grauS: dados.grauS,
        preC: dados.preC,
        exp: dados.exp,
        hab: dados.hab,
        des: dados.des,

        Mequi: dados.Mequi,
        Mcomp: dados.Mcomp,
        Mprod: dados.Mprod,

        Res: dados.Res,
        Metas: dados.Metas,
        Satis: dados.Satis,
        Quali: dados.Quali,
        Ndemandas: dados.Ndemandas,
        Nerros: dados.Nerros,
        Naci: dados.Naci,

        Presenca: dados.Presenca,
        Natrasos: dados.Natrasos,
        Disciplina: dados.Disciplina,

        Qualificacao: TotalQuali,
        Tequi: TrabalhoEmEquipe,
        Produtividade: Produtividade,
        DisciplinaTotal: DisciplinaTotal,
        Total: Total
    }

    try {
        
        await Person.create(bd)

    } catch (error) {
        
        res.redirect('/home')

    }

    res.redirect('/users')
})

mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.SENHA}@gp.kf47hoi.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{console.log('Conectado com sucesso')})
.catch((err)=>{
    console.log(`Erro : ${err}`)
})


app.listen(PORT)