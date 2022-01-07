const path = require('path')

const customPath = '/relatorios/marcelo/relatorio1.pdf'

/* console.log(path.dirname(customPath))
console.log(path.basename(customPath))
console.log(path.extname(customPath)) */

// path Absoluto
console.log(path.resolve('teste.txt'))

// formar um path

const midFolder = 'realatorios'
const fileName = 'teste2.txt'

const finalPath = path.join('/','arquivo', midFolder, fileName)
console.log(finalPath)