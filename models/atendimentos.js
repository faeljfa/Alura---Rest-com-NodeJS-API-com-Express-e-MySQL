//Adicionando a biblioteca moment. Responsável por tranalhar com datas 
const moment = require('moment')

//buscando o axios para fazer uso da API
const axios  = require('axios')

//trazendo a conexao com o banco de dados para ser usada na classe
const conexao = require('../infraestrutura/conexao')

//classe que vai realizar as oerações no banco de dados
class Atendimento{

    //metodo que faz o insert na tabela de atendimentos. Recebe um atendimento como parametro  
    adiciona(atendimento, res){
        //Adicionando a data da criação do registro
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')

        //Formatando a data da consulta que vai ser inserida no banco
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        /*validações - inicio*/
        // 1 - validando datas return boolean
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
console.log(dataValida)
        // 2 - cliente com nome valido. verifica se o nome informado possui 5 ou mais caracteres
        const clienteValido = atendimento.cliente.length >= 5

        //criando o array contendo os possiveis erros 
        const validacoes = [
            {
                nome:'data',
                valido: dataValida,
                mensagem:'A data tem que ser maior ou igual ao dia atual'
            },
            {
                nome:'cliente',
                valido: clienteValido,
                mensagem:'O nome do cliente deve conter 5 ou mais caracteres'
            },
            
        ]

        //retorna para a constante erros com os campos que não são validos
        const erros = validacoes.filter(campo => !campo.valido)

        //retorna o tamanho da constante erros. caso haja algum erro, o tamanho vai ser diferente de 0
        const existemErros = erros.length
        /*validações - fim*/

        //caso existam erros
        if(existemErros){
            res.status(400).json(erros)

            //caso não existam erros, prossegue para a criação do registro
        } else {

            //criando um atendimento com a data
            const atendimentoDatado = {...atendimento, dataCriacao, data}
        
            //define a query de insercao
            const sql = 'INSERT INTO Atendimentos SET ? '

            //realiza a inserção no banco de dados
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            
            //caso haja algum erro, imprime o erro ocorrido informando o status 400 que significa bad request
            if(erro){
                res.status(400).json(erro)
            }else{
                //imprime o resultado da query caso não haja erro nenhum informando o status 201 q significa que
                //que o registro foi criado corretamente
                res.status(201).json(atendimento)
            }
        })
        }
    }

    //metodo que lista os dados que estão garvados no banco
    lista(res){
        //definindo a query para realizar a seleção
        const sql = 'SELECT * FROM atendimentos'
        
        //executa a conexao com o banco de dados e executa a query
        conexao.query(sql, (erro, resultados) => {
            
            //caso haja erro, envia o status 400 e o erro que ocorreu em formato json 
            if(erro){
                res.status(400).json(erro)
            } else {
                //caso não de problema, retorna o resultado em json e o status 200
                res.status(200).json(resultados)
            }
        })
    }

    //método que realiza a busca com algum id passado
    buscaPorId(id, res){

        //definindo a query responsavel por trazer o resultado filtrado por id
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

        //executa a conexao com o banco de dados e executa a query
        conexao.query(sql, async (erro, resultados) => {

            //definindo a constante para retornar o resultado em forma de objeto
            const atendimento = resultados[0]

            //Salvando o cpf do cliente
            const cpf = atendimento.cliente

            //caso haja erro, envia o status 400 e o erro que ocorreu em formato json 
            if(erro){
                res.status(400).json(erro)
            } else {
                //fazendo a busca do cliente na API e salvando em um objeto
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)

                //adicionando resultado da busca no indice clente do atendimento
                atendimento.cliente = data

                //Realizando o envio do status 200 e do atendimento
                res.status(200).json(atendimento)
            }
        })
    }

    deleta(id, res){

        //definindo a query responsavel por excluir o registro
        const sql = 'DELETE FROM atendimentos WHERE id = ?'

        //executa a conexao com o banco de dados e executa a query
        conexao.query(sql, id, (erro, resultados) => {

            //caso haja erro, envia o status 400 e o erro que ocorreu em formato json 
            if(erro){
                res.status(400).json(erro)
            } else {
                //caso não de problema, realiza a exclusão e informa o status 200
                res.status(200).json(id)
            }
        })
    }

    altera(id, valores, res){

        //verifica se existe um valor no campo data
        if(valores.data){
            //caso exista, converte a data para o formato correto
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        //definindo a query responsavel por excluir o registro
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        //Realizando a conexao e executando a query definida acima
        conexao.query(sql, [valores, id], (erro, resultados) => {

            //caso haja erro, envia o status 400 e o erro que ocorreu em formato json 
            if(erro){
                res.status(400).json(erro)
            } else {
                //caso não de problema, retorna o resultado em json e o status 200
                res.status(200).json(...valores, id)
            }

        }
    )}
}

module.exports = new Atendimento