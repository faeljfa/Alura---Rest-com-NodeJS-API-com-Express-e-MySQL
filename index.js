//Importando as configurações do customExpress
const customExpress = require('./config/customExpress')

//configurando para que o customExpress funcione na variavel app
const app = customExpress()

//subindo um servidor web e definindo uma porta
app.listen(3000, () =>
    //Imprime no console uma mensagem informando que o servidor subiu normalmente
    console.log("Servidor rodando na porta 3000")
)