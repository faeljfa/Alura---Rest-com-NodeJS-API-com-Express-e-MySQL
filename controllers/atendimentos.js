//importando a model atendimento para que possam ser acrescentados os atendimentos ao banco 
const Atendimento = require('../repositorios/atendimento')

//exportando o módulo para que possa ser utilizado em nossa aplicação.
module.exports = app => {
    
    //Rota para a página de atendimentos via metodo get listando todos os atendimentos
    app.get('/atendimentos', (req, res) => {
        //realiza a busca
        Atendimento.lista()
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    //Rota para a página de atendimentos via metodo get listando atendimento com filtro 
    app.get('/atendimentos/:id', (req, res) => {
        //convertendo o parametro enviado para inteiro
        const id = parseInt(req.params.id);
        //realiza a busca
        Atendimento.buscaPorId(id, res)

    })

    //Rota para a página de exclusão passando um id
    app.delete('/atendimentos/:id', (req, res) => {

        //pegando o parametro enviado
        const id = req.params.id

        //realiza o delete
        Atendimento.delete(id)
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    //Rota para a página de atendimentos via metodo post
    app.post('/atendimentos', (req, res) => {
        //recebendo o que vem do documento submetido
        const atendimento = req.body

        //executando a inserção
        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => 
                res.status(201).json(atendimentoCadastrado)
            )
            .catch(erros => res.status(400).json(erros))
    })

    //Rota para fazer a alteração dos dados em algum registro
    //patch é o método para fazer update
    app.patch('/atendimentos/:id', (req, res) => {
        
        //convertendo o parametro enviado para inteiro
        const id = parseInt(req.params.id);

        //pegando os dados para serem alterados
        const valores = req.body

         //verifica se existe um valor no campo data
         if(valores.data){
            //caso exista, converte a data para o formato correto
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        Atendimento.altera(id, valores, res)
            .then(atendimentoCadastrado => 
                res.status(201).json(atendimentoCadastrado)
            )
            .catch(erros => res.status(400).json(erros))
    })
}