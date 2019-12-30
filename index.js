const Commander = require('commander')
const Database = require('./database')
const Pessoa = require('./pessoa')

async function main(){
Commander
.version("veremos oque vai fazer !")

.option('-n, --nome [value]', "O Nome é : ")
.option('-s, --status [value]', "O Status é : ")
.option('-i, --id [value]', "O ID é : ")

.option('-I, --Inserir', "Cadastrou sussa!")
.option('-L, --Ler', "Listou sussa!")
.option('-D, --Deletar ', "Removeu sussa!")
.option('-A, --Atualizar [value]', "Removeu sussa!")


.parse(process.argv)


const pessoa = new Pessoa(Commander)

try{

if(Commander.Inserir){
    delete pessoa.id
    const resultado = await Database.Inserir(pessoa)
    if(!resultado){
        console.error('Consumidor invalido')
        return;
    }
    console.log('Cadastrou Sussa')
}

if(Commander.Ler){
    const resultado = await Database.Ler()
    console.log(resultado)
        return;
}

if(Commander.Deletar){
    const resultado = await Database.Deletar(pessoa.id)
    if(!resultado){
        console.error('deu error na remoção')
    }
    console.log("Deletou Suave!")


}

if(Commander.Atualizar){
    const idAtualizar = parseInt(Commander.Atualizar)
    const dados = JSON.stringify(pessoa)
    const IDAtualizado = JSON.parse(dados)
    const resultado = await Database.Atualizar(idAtualizar,IDAtualizado)
    if(!resultado){
        console.error('deu error em atualizar')
    }
    console.log('Atualizado com sucesso!')
}

}catch(error){
console.error(`Berrrrooooouuuu -----${error}-----`)
    }
}

main()