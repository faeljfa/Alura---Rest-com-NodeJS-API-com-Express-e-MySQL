//buscando o modulo fs 'filesystem'
const fs = require('fs')
const path = require('path')

//exportando a função que faz o cadastro no banco e upa o arquivo
module.exports = (caminho, nomeDoArquivo, calbackImagemCriada) =>{

    //Definindo os tipos validos para salvar os arquivos
    const tiposValidos = ['jpg','jpeg','png']

    //Pegando a extensao do arquivo
    const tipo = path.extname(caminho)

    //Pegando a extensão do arquivo sem o ponto para verificar se é um tipo válido
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if(!tipoEhValido){
        //mensagem de erro para ser exibida ao usuário
        const erro = "Tipo inválido"
        calbackImagemCriada(erro)
    } else {
        //novo caminho para salvar o arquivo enviado
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`

        //fazendo o upload da imagem usando stream
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => calbackImagemCriada(false, novoCaminho))
        
    }
    
}