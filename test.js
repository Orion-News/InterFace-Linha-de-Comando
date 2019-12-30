const {
    deepEqual,
    ok
} = require('assert')

const ARQUIVO_DEFAULT = {
    nome: 'Johnson',
    id: 1, 
    status: 'Padrão'
}

const FILE_DEFAULT = {
    nome: 'Mong',
    id: 2,
    status: 'Padrão'
}

const database = require('./database')

describe('Faz o cadastramento do arquivo padrão', ()=>{
    
    before(async () => {
        await database.Inserir(ARQUIVO_DEFAULT)
        await database.Inserir(FILE_DEFAULT)
    }
)

    it('deve listar uma pessoa', async ()=>{
        const esperado = ARQUIVO_DEFAULT

        const [resultado] = await database.Ler(esperado.id)

        deepEqual(resultado, esperado)

        console.log('Resultado: ', resultado, 'Esperado: ', esperado)
    })

    it('deve cadastrar uma pessoa em basedados.json', async ()=>{
        const esperado = ARQUIVO_DEFAULT

        const resultado = await database.Inserir(ARQUIVO_DEFAULT)
        const [actual] = await database.Ler(ARQUIVO_DEFAULT.id)

        ok(resultado, [actual], esperado)

    })

    it('deve remover uma pessoa da base pelo id', async ()=>{
        const esperado = true
        const resultado = await database.Deletar(ARQUIVO_DEFAULT.id)

        ok(resultado, esperado)
        
    })

    it('deve utualizar uma pessoa pelo id', async ()=> {
    const expected = {
    ...FILE_DEFAULT,
    nome: 'Geverson',
    status: 'Comum'
    }

    const novoObj = {        
    nome: 'Geverson',
    status: 'Comum'
    }

    await database.Atualizar(FILE_DEFAULT.id, novoObj)
    const [resultado] = await database.Ler(FILE_DEFAULT.id)

    deepEqual(resultado, expected)
    })

})