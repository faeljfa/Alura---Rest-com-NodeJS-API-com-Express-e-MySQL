const query = require('../infraestrutura/database/queries')

class Atendimento{

    adiciona(atendimento){

        //define a query de insercao
        const sql = "INSERT INTO Atendimentos SET ? "

        //retorna a execução da query passada
        return query(sql, atendimento)
    }

    lista(){
        //definindo a query para realizar a seleção
        const sql = 'SELECT * FROM atendimentos'

        return query(sql)
    }

    delete(id){

        //definindo a query responsavel por excluir o registro
        const sql = 'DELETE FROM atendimentos WHERE id = ?'
        
        //Executando a query definida acima
        return query(sql, id)
    }

    altera(id, valores){

        //definindo a query responsavel por excluir o registro
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        //Executando a query definida acima
        return query(sql, [valores, id])
    }
}

module.exports = new Atendimento()