const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readLine.question('Qual sua linguagem preferida?', (linguagem) => {
     console.log(`A linguagem favorita : ${linguagem}`)
     readLine.close()
})
