//Importando as configurações do customExpress
const customExpress = require('./config/customExpress')

//importando a conexão com o banco de dados
const conexao = require('./infraestrutura/conexao')

//importando o módulo tabelas
const tabelas = require('./infraestrutura/tabelas')

//executando a conexão com o banco de dados
conexao.connect((erro) => {

    //verificando se não ocorreu nenhum problema com a conexão ao banco de dados
    if(erro){
        //exibe o erro no console
        console.log(erro)
        //retorna false caso haja algum erro
        return false
    }else{

        //iniciando o módulo tabelas e passando como parametro a constante que recebe a conexão com o
        //banco de dados
        tabelas.init(conexao)
        
        //subindo um servidor web e definindo uma porta
        app.listen(3000, () =>
        //Imprime no console uma mensagem informando que o servidor subiu normalmente
        console.log("Servidor rodando na porta 3000"))
        //retorna true caso faça a conexão corretamente
        return true
    }
})

//configurando para que o customExpress funcione na variavel app
const app = customExpress()

