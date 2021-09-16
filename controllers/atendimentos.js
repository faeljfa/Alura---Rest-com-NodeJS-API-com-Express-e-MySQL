//imporando a model atendimento para que possa ser acrescentados os atendimentos ao banco 
const Atendimento = require('../models/atendimentos')

//exportando o módulo para que possa ser utilizado em nossa aplicação.
module.exports = app => {
    //Rota para a página de atendimentos via metodo get listando todos os atendimentos
    app.get('/atendimentos', (req, res) => {
        //realiza a busca
        Atendimento.lista(res)

    })

    //Rota para a página de atendimentos via metodo get listando atendimento com filtro 
    app.get('/atendimentos/:id', (req, res) => {
        //convertendo o parametro enviado para inteiro
        const id = parseInt(req.params.id);
        //realiza a busca
        Atendimento.buscaPorId(id, res)

    })

    //Rota para a página de atendimentos via metodo post
    app.post('/atendimentos', (req, res) => {
        //recebendo o que vem do documento submetido
        const atendimento = req.body

        //executando a inserção
        Atendimento.adiciona(atendimento, res)
        //res.send("Voce está na rota de atendimentos e utilizando post")
    })
}