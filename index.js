//Importando a biblioteca express para uso no projeto
const express = require('express')

//Declarando que a biblioteca será usada nessa constante app
const app = express()

//subindo um servidor web e definindo uma porta
app.listen(3000, () =>
    //Imprime no console uma mensagem informando que o servidor subiu normalmente
    console.log("Servidor rodando na porta 3000")
)

//rota criada para a index da página que é representada pelo '/' na função são passados os 
//parâmetros req e res onde req é a requisicao e res a resposta.
app.get('/', (req, res) => {
    res.send('Rota para a página principal')
})

//Rota para a página de atendimentos
app.get('/atendimentos', (req, res) => {
    res.send('Rota de atendimentos')
})