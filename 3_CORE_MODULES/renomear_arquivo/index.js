const fs = require('fs')

fs.rename('arquivo.txt', 'novoArquivo.txt', err => {
    if(err){
        console.log(err)
        return
    }
    console.log('arquivo alterado')
})