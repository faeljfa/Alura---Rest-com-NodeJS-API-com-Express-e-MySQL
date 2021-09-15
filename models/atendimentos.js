//Adicionando a biblioteca moment. Responsável por tranalhar com datas 
const moment = require('moment')

//trazendo a conexao com o banco de dados para ser usada na classe
const conexao = require('../infraestrutura/conexao')

//classe que vai realzar as oerações no banco de dados
class Atendimento{

    //metodo que fará o insert na tabela de atendimentos. Recebe um atendimento como parametro  
    adiciona(atendimento, res){
        //Adicionando a data da criação do registro
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')

        //Formatando a data da consulta que vai ser inserida no banco
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        //criando um atendimento com a data
        const atendimentoDatado = {...atendimento, dataCriacao, data}
        
        //define a query de insercao
        const sql = 'INSERT INTO Atendimentos SET ? '

        //realiza a inserção no banco de dados
        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            //caso haja algum erro, imprime o erro ocorrido
            if(erro){
                res.json(erro)
            }else{
                //imprime o resultado da query caso não haja erro nenhum
                res.json(resultados.insertId)
            }
        })


    }
}

module.exports = new Atendimento