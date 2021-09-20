const query = require('../infraestrutura/database/queries')

class Atendimento{

    adciona(atendimento){

        //define a query de insercao
        const sql = 'INSERT INTO Atendimentos SET ? '
        
        //retorna a execução da query passada
        return query(sql, atendimento)
    }

}

module.exports = new Atendimento()