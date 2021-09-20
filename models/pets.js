//trazendo a conexao com o banco de dados para ser usada na classe
const conexao = require('../infraestrutura/conexao')

//importando a funcão que realiza o upload de arquivos
const uploadDeArquivo = require('../infraestrutura/arquivos/upload')

//Classe que realiza as operações no banco de dados para os pets cadastrados
class Pet{

    //Metodo que faz a adição dos registros
    adiciona(pet, res){

        //definindo a query responsável pela inserção no banco
        const query = 'INSERT INTO pets SET ?'
        
        //realizando o upload do arquivo
        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) =>{

            if(erro){
                res.status(400).json({erro})
            }else{
                //objeto com as informações que serao adicionadas
                const novoPet = {nome:pet.nome, imagem: novoCaminho}

                //Executando a query
                conexao.query(query, novoPet, erro => {
                    if(erro){
                        //Caso de erro, informa o codigo 400 e retorna o erro no formato json
                        res.status(400).json(erro)
                    }else{
                        //Caso de certo, informa o codigo 200 e retorna o json com as informações do pet passadas
                        res.status(200).json(novoPet)
                    }
                })
            }
        })
    }
}


module.exports = new Pet()