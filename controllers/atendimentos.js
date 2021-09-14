//exportando o módulo para que possa ser utilizado em nossa aplicação.
module.exports = app => {
    //Rota para a página de atendimentos
    app.get('/atendimentos', (req, res) => {res.send('Rota de atendimentos')})
}