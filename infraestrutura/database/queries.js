//definindo a conexão
const conexao = require('../conexao')

//constante que recebe o resultado da query executada 
const executaQuery = (query, parametros = '') => {

    //faz o return da Promisse (função assíncrona)
    return new Promise((resolve, reject) =>{
        //conecta e executa a query
        conexao.query(query, parametros, (erros, resultados) => {
            //caso ocorra algum erro, dspara um reject
            if(erros){
                reject(erros)
            }else{
                //caso ocorra tudo bem, dspara um resultado
                resolve(resultados)
            }
        })
    }) 
}

module.exports = executaQuery