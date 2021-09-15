//trazendo a conexao com o banco de dados para ser usada na classe
const conexao = require('../infraestrutura/conexao')

//classe que vai realzar as oerações no banco de dados
class Atendimento{

    //metodo que fará o insert na tabela de atendimentos. Recebe um atendimento como parametro  
    adiciona(atendimento){
        //define a query de insercao
        const sql = 'INSERT INTO Atendimentos SET ? '

        //realiza a inserção no banco de dados
        conexao.query(sql, atendimento, (erro, resultados) => {
            //caso haja algum erro, imprime o erro ocorrido
            if(erro){
                console.log(erro)
            }else{
                //imprime o resultado da query caso não haja erro nenhum
                console.log(resultados)
            }
        })


    }
}

module.exports = new Atendimento