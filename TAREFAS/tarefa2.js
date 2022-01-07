const chalk = require('chalk')
const inquirer = require('inquirer')

const log = console.log;

inquirer.prompt(
    [
        {name: 'nome', message: 'Digite seu nome: '},
        {name: 'idade', message: 'Digite sua idade: '}
    ]
    )
    .then((resposta) => {
        log(chalk.bold.black.bgYellowBright(`Olá!, ${resposta.nome}, tudo bem? Sua idade é ${resposta.idade}`))
    })
    .catch(err => console.log(err))

    