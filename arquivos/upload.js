//buscando o modulo fs 'filesystem'
const fs = require('fs')
const path = require('path')

module.exports = () =>{

}

//fazendo o upload da imagem usando stream
fs.createReadStream('./assets/cachorro-filhote.jpg')
    .pipe(fs.createWriteStream('./assets/cachorro-filhote-stream.jpg'))
    .on('finish', () => {console.log('upload terminado')})