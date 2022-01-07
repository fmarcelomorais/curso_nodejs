const http = require('http')
const porta = 3000
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('content-Type', 'text/html')
    res.end(
        '<h1>Recebendo HTML via http</h1><p>Testando Atualização</p>')
})

server.listen(porta, () =>{
    console.log('Servidor rodando na porta ', porta)
})