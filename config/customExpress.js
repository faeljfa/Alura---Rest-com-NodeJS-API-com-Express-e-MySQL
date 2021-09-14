//Importando o modulo express para uso no projeto
const express = require('express')

//Importando o modulo consign para uso no projeto
const consign = require('consign')

//importanto a biblioteca body-parser
const bodyParser = require('body-parser')

//exportando o modulo para ser utilizado na aplicação
module.exports = () => {
    
    //declarando que o express será utilizado nessa constante
    const app = express()

    //usando o bodyparser e informando o urlencoded (formulário enviados do browser)
    app.use(bodyParser.urlencoded({extended:true}))

    //configurando para receber também dados no formato json
    app.use(bodyParser.json())
    
    //informando para o consign que a pasta controllers deverá ser utilizada dentro da constante app
    consign()
        .include("controllers")
        .into(app)

    return app;
}