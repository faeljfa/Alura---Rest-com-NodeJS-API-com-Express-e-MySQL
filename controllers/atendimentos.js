//exportando o módulo para que possa ser utilizado em nossa aplicação.
module.exports = app => {
    //Rota para a página de atendimentos via metodo get
    app.get('/atendimentos', (req, res) => {res.send('Rota de atendimentos via get')})

    //Rota para a página de atendimentos via metodo post
    app.post('/atendimentos', (req, res) => {res.send("Voce está na rota de atendimentos e utilizando post")})
}