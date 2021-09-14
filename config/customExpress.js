//Importando o modulo express para uso no projeto
const express = require('express')

//Importando o modulo consign para uso no projeto
const consign = require('consign')

module.exports = () => {
    //declarando que o express será utilizado nessa constante
    const app = express()

    //informando para o consign que a pasta controllers deverá ser utilizada dentro da constante app
    consign()
        .include("controllers")
        .into(app)

    return app;
}