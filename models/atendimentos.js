//Adicionando a biblioteca moment. Responsável por tranalhar com datas 
const moment = require('moment')

//buscando o axios para fazer uso da API
const axios  = require('axios')

//trazendo a conexao com o banco de dados para ser usada na classe
const conexao = require('../infraestrutura/conexao')

//importando o repositorio
const repositorio = require("../repositorios/atendimento")

//classe que vai realizar as oerações no banco de dados
class Atendimento{
    
    constructor(){

        /*validações - inicio*/
        // 1 - validando datas return boolean
        this.dataValida = ({data, dataCriacao}) => {
            moment(data).isSameOrAfter(dataCriacao)
        }
        // 2 - cliente com nome valido. verifica se o nome informado possui 5 ou mais caracteres
        this.clienteValido = (tamanho) => {
            tamanho >= 5
        }
        //função que realiza a validação
        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo
            const { parametro } = parametro[nome]

            return !campo.valido(parametro)
        })

        //criando o array contendo os possiveis erros 
        this.validacoes = [
            {
                nome:'data',
                valido: this.dataValida,
                mensagem:'A data tem que ser maior ou igual ao dia atual'
            },
            {
                nome:'cliente',
                valido: this.clienteValido,
                mensagem:'O nome do cliente deve conter 5 ou mais caracteres'
            },
            
        ]
    }
    //metodo que faz o insert na tabela de atendimentos. Recebe um atendimento como parametro  
    adiciona(atendimento){
        //Adicionando a data da criação do registro
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')

        //Formatando a data da consulta que vai ser inserida no banco
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        //parametros a serem validados
        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.length}
        }

        //retorna para a constante erros com os campos que não são validos
        const erros = this.valida(parametros)

        //retorna o tamanho da constante erros. caso haja algum erro, o tamanho vai ser diferente de 0
        const existemErros = erros.length
        /*validações - fim*/

        //caso existam erros
        if(existemErros){
            //retorna uma new promisse com os erros apresentados
            return new Promise((resolve, reject) => reject(erros))
        } else {
            //caso não existam erros, prossegue para a criação do registro
            //criando um atendimento com a data
            const atendimentoDatado = {...atendimento, dataCriacao, data}
        
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return res.status(201).json({...atendimento, id})
                })
        }
    }

    //metodo que lista os dados que estão garvados no banco
    lista(){
        return repositorio.lista()
    }

    //Método que deleta um unico registro
    delete(id){
        return repositorio.delete(id)
    }

    altera(id, valores){
        return repositorio.altera(id, valores)
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
}

module.exports = new Atendimento