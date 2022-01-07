const url = require('url')

const endereco = 'https://www.meusite.com.br/catalog?produtos=cadeira'
const parsedUrl = new url.URL(endereco)

console.log(parsedUrl.host)
console.log(parsedUrl.pathname)
console.log(parsedUrl.protocol)
console.log(parsedUrl.search)
console.log(parsedUrl.searchParams)
console.log(parsedUrl.searchParams.get('produtos'))