//imporando a model atendimento para que possa ser acrescentados os atendimentos ao banco 
const Atendimento = require('../models/atendimentos')

//exportando o módulo para que possa ser utilizado em nossa aplicação.
module.exports = app => {
    //Rota para a página de atendimentos via metodo get
    app.get('/atendimentos', (req, res) => {res.send('Rota de atendimentos via get')})

    //Rota para a página de atendimentos via metodo post
    app.post('/atendimentos', (req, res) => {
        //recebendo o que vem do documento submetido
        const atendimento = req.body

        //executando a inserção
        Atendimento.adiciona(atendimento)
        res.send("Voce está na rota de atendimentos e utilizando post")
    })
}