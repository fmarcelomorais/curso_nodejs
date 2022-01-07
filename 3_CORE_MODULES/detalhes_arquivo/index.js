const fs = require("fs")
const { start } = require("repl")

fs.stat('novoArquivo.txt', (err, stats) => {
    if(err){
        console.log(err)
        return
    }
    const diretorio = stats.isDirectory()
    const arquivo = stats.isFile()
    const tam = stats.size
    const criacao = stats.ctime

    console.log(`
    É um arquivo? ${arquivo}
    É um Diretorio? ${diretorio}
    Tamanho do arquivo - ${tam}k
    Criado em ${criacao}
    `)
})