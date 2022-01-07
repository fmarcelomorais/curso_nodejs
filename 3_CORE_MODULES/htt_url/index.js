const http = require('http')
//const url = require('url')
const porta = 3000

const server = http.createServer((req, res)=> {
    const urlInfo = require('url').parse(req.url, true)
    const name = urlInfo.query.name
    res.statusCode = 200
    res.setHeader('contenty-Type', 'text/html')
    if(!name){
        res.end(`
        <h1>Preencha Seu nome</h1>
        <form method="GET">
            <input type="text" name="name">
            <input type="submit" value="enviar">
        </form>
        `)
    }else{
        res.end(`<h1>Bem vindo! ${name}</h1>`)
    }
  
})

server.listen(porta, ()=>{
    console.log('rodando na porta ', porta)
})


