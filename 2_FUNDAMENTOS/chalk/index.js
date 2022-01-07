const chalk = require('chalk')
const nota = 6

if(nota < 7){
    let msg = chalk.red.bgWhite.bold("Voce ficou abaixo da media")
    console.log(msg)
}else if(nota >= 7){
    console.log(chalk.green("parabens"))
}