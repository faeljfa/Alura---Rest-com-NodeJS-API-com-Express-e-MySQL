//Importando o modulo express para uso no projeto
const express = require('express')

//Importando o modulo consign para uso no projeto
const consign = require('consign')

//declarando que o express será utilizado nessa constante
const app = express()

//informando para o consign que a pasta controllers deverá ser utilizada dentro da constante app
consign()
    .include("controllers")
    .into(app)

//subindo um servidor web e definindo uma porta
app.listen(3000, () =>
    //Imprime no console uma mensagem informando que o servidor subiu normalmente
    console.log("Servidor rodando na porta 3000")
)



