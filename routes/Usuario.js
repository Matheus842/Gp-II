const express = require('express')
const router = require('express').Router()
const Person = require('../models/Person')

router.use(express.static('public'))

router.get('/:id', async (req, res) => {
    id = req.params.id

    try {

        const people = await Person.findOne({_id: id})

        console.log(people)
    
        pessoa = {
            Nome: people.Nome,
            idade: people.idade,
            Qualificacao: people.Qualificacao,
            Tequi: people.Tequi,
            Produtividade: people.Produtividade,
            DisciplinaTotal: people.DisciplinaTotal,
            Total: people.Total
        }

    } catch (error) {
        
        pessoa = {
            Nome: "Usuario não encontrado",
            idade: ""
        }

    }




    res.render('usuario', {pessoa})
})

module.exports = router