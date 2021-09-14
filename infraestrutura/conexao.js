//adicionando o mysql no projeto
const mySql = require('mysql')

const conexao = mySql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
})

module.exports = conexao