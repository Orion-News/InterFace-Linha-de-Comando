const {
    readFile,
    writeFile
      } = require('fs')

const {
    promisify
      } = require('util')

const ArquivoPromise = promisify(readFile)
const ArquivoPromiseEscrever = promisify(writeFile)

class Database{
constructor(){
  this.NOME_ARQUIVO = 'BaseDados.json'
    }

async obterArquivo(){
  const arquivo = await ArquivoPromise(this.NOME_ARQUIVO, 'utf8')
  return JSON.parse(arquivo.toString())
    }

async escreverArquivo(dados){
  await ArquivoPromiseEscrever(this.NOME_ARQUIVO, JSON.stringify(dados))
  return true
    }

async Inserir(pessoa){
  const dados = await this.obterArquivo()
  const  id = pessoa.id <= 2 ? pessoa.id : Date.now()

  const PessoaNovoId = {
  id,
  ...pessoa
  }
  const DadosFinal = [
  ...dados,
  PessoaNovoId
  ]
  const resultado = await this.escreverArquivo(DadosFinal)
  return resultado
  }
  
async Ler(id){
  const dados = await this.obterArquivo()
  const dadosFilters = dados.filter(item => (id ? (item.id === id) : true))
  return dadosFilters
  }

async Deletar(id){
 if(!id){
  return await this.escreverArquivo([])
      }
  const dados = await this.obterArquivo()
  const indice = dados.findIndex(item => item.id === parseInt(id))
  if(indice === - 1){
  throw Error('O cara não informou o Id então não é existente')
      }
    dados.splice(indice, 1)
  return await this.escreverArquivo(dados)
  }

async Atualizar(id, modificacoes){

const dados = await this.obterArquivo()
const indice = dados.findIndex(item => item.id === parseInt(id))
if(indice === -1){
  throw Error('A pessoa procurada não existe')
}

const atual = dados[indice]

const objeto = {
  ...atual,
  ...modificacoes
}
dados.splice(indice, 1)

return await this.escreverArquivo([
  ...dados,
  objeto
])

  }
}

module.exports = new Database()