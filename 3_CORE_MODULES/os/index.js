const os = require('os')

const cpu = os.cpus()
const memoria = os.freemem()
const diretorio = os.homedir()
const tipo = os.type()

console.table(cpu)
console.log(memoria)
console.log(diretorio)
console.log(tipo)