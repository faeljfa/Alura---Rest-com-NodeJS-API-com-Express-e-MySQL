//classe responsável por criar as tabelas em nosso sistema
class tabelas{
    //iniciando a conexão com o banco de dados sendo executado na index
    init(conexao){
        //trazendo o parametro passado para o escopo da classe
        this.conexao = conexao

        //executando o metodo para criar a tabela atendimentos
        this.criarAtendimentos()
    }

    //metodo responsável por criar a tabela no banco de dados caso ainda nao exista
    criarAtendimentos(){

        //definindo a query
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT,cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        //executando a query
        this.conexao.query(sql, erro => {
            //verificando se ocorreu algum erro na execução da query
            if(erro){
                //imprime no console o erro que ocorreu
                console.log(erro)
            } else {
                console.log("Tabela criada com sucesso")
            }
        })
    }
}

module.exports = new tabelas