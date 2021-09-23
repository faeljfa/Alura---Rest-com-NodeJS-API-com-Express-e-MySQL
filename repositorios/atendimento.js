const query = require('../infraestrutura/database/queries')

class Atendimento{

    adiciona(atendimento){

        //define a query de insercao
        const sql = 'INSERT INTO Atendimentos SET ? '

        //retorna a execução da query passada
        return query(sql, atendimento)
    }

    lista(){
        //definindo a query para realizar a seleção
        const sql = 'SELECT * FROM atendimentos'

        return query(sql)
    }

}

module.exports = new Atendimento()