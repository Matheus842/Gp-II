const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    Nome: String,
    idade: Number,
    grauF: Number,
    grauM: Number,
    grauS: Number,
    preC: Number,
    exp: Number,
    hab: Number,
    des: Number,
    Mequi: Number,
    Mcomp: Number,
    Mprod: Number,
    Res: Number,
    Metas: Number,
    Satis: Number,
    Quali: Number,
    Ndemandas: Number,
    Nerros: Number,
    Naci: Number,
    Presenca: Number,
    Natrasos: Number,
    Disciplina: Number,
    Qualificacao: Number,
    Tequi: Number,
    Produtividade: Number,
    DisciplinaTotal: Number,
    Total: Number
})

module.exports = Person