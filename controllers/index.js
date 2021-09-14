module.exports = app => {
    //rota criada para a index da página que é representada pelo '/' na função são passados os 
    //parâmetros req e res onde req é a requisicao e res a resposta.
    app.get('/', (req, res) => {res.send('Rota para a página principal')})
}