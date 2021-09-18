//importando a model pets para que possa ser acrescentados os pets ao banco 
const Pet = require('../models/pets')

module.exports = app =>{

    app.post('/pet', (req, res)=>{
        
        const pet = req.body
        
        Pet.adiciona(pet, res)
    })
}