// Modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// Modulos internos
const fs = require('fs')
operacoes()
function operacoes(){
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'acao',
                message: 'O que você deseja fazer?',
                choices: [ 'Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
            }
        ]
        )
        .then((resposta)=>{
            const acao = resposta['acao']
            if(acao === 'Criar Conta'){
                criarConta()
            }else if(acao === 'Consultar Saldo'){
                consultarSaldo()
            }else if(acao === 'Depositar'){
                depositar()
            }else if(acao === 'Sacar'){
                sacar()
            }else if(acao === 'Sair'){
                console.log(chalk.blue.bold('Obrigado por Usar o MyBank!'))
                process.exit()
            }else{
                console.log(chalk.bgRed.black('Opção Invalida'))
                operacoes()
            }

        })
        .catch(err => console.log(err))
}
// criar conta

function criarConta(){
    console.log(chalk.bgGreen.black('Parabens por escolher o MyBank'))
    console.log(chalk.bgWhite.black('Defina as opcoes da sua conta a seguir'))

    buildAccount()
}

function buildAccount(){
     inquirer.prompt([
         { name: 'nomeDaConta', message: 'Digite o nome da Conta'}
     ])
     .then((resposta) => {
         const nomeDaConta = resposta['nomeDaConta']
         console.info(nomeDaConta);

         if(!fs.existsSync('contas')){
             fs.mkdirSync('contas')
         }
         if(fs.existsSync(`contas/${nomeDaConta}.json`)){
             console.log(chalk.bgRed.black('Conta ja Existe. Escolha outro nome'))
             buildAccount()
             return
         }
         fs.writeFileSync(`contas/${nomeDaConta}.json`, '{"balence": 0}', err => 
         console.log(err)
        )
        console.log(chalk.green.bold('Sua conta foi criada'))
        operacoes()
     })
     .catch(err => console.log(err))
}

function depositar(){
    inquirer.prompt([
        {
            name: 'nomeDaConta',
            message: 'Qual o nome da Sua conta?'
        }
    ])
    .then((resposta)=> {
        const nomeDaConta = resposta['nomeDaConta']

        if(!chekConta(nomeDaConta)){
            return depositar()
        }

        inquirer.prompt(
            [
                {name: 'amount', message: 'Digite o valor a ser depositado:'}
            ]
        )
        .then((resposta) => {
            const valor = resposta['amount']
            
            adicionar(nomeDaConta, valor)
            operacoes()
            // adicionar o valor


        })
        .catch(err => console.log(err))
        
    })
    .catch(err => console.log(err))
}

function chekConta(nomeDaConta){
    if(!fs.existsSync(`contas/${nomeDaConta}.json`) || !nomeDaConta){
        console.log(chalk.red.bold('Conta Não Existe.'))
        return false
    }

    return true
}

function adicionar(nomeDaConta, valor){
    const conta = pegarNomeDaConta(nomeDaConta)
    if(valor < 0 || !valor){
        console.log(chalk.red.bold('Digite um valor válido'))
        return depositar()
    }
    
    conta.balence = parseFloat(valor) + parseFloat(conta.balence)
    fs.writeFileSync(
        `contas/${nomeDaConta}.json`,
        JSON.stringify(conta),
        function(err){console.log(err)}
    )
    console.log(chalk.green.bold(`Depositado R$ ${valor} com sucesso. Seu novo saldo é R$ ${conta.balence}`))
   // operacoes()
}


function pegarNomeDaConta(nomeDaConta){
    const contaJson = fs.readFileSync(`contas/${nomeDaConta}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(contaJson)

}

function consultarSaldo(){
    inquirer.prompt(
        [
            {name: 'nomeDaConta', message: 'Qual o nome da sua conta?' }
        ]
        )
        .then((resposta) => {
            const nomeDaConta = resposta['nomeDaConta']

            if(!chekConta(nomeDaConta)){
                return consultarSaldo()
            }

            const conta = pegarNomeDaConta(nomeDaConta)

            console.log(chalk.bgBlue.black(`Seu Saldo é R$ ${conta.balence}`));
            operacoes()
        })
        .catch(err => console.log(err))
}

function sacar(){
    inquirer.prompt(
        [
            {name: 'nomeDaConta', message: 'Qual o nome da Conta'}
        ]
    )
    .then((resposta) => {
        const nomeDaConta = resposta['nomeDaConta']

        if(!chekConta(nomeDaConta)){
            return sacar()
        }

    inquirer.prompt( 
        [ {name: 'valor', message: 'Qual o valor do Saque?'} 
    ])
    .then((resposta)=>{
        const valorSaque = resposta['valor']
        removeValor(nomeDaConta, valorSaque)
        //operacoes()
    })
    .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function removeValor(nomeDaConta, valor){
    const conta = pegarNomeDaConta(nomeDaConta)
    if(!conta){
        console.log(chalk.bgRed.black('Conta invalida'))    
        return sacar()  
    }else if(!valor){
        console.log(chalk.bgRed.black('valor invalido'))
        return sacar() 
    }else if( conta.balence < valor){
        console.log(chalk.bgRed.black('Saldo insuficiente'))
        return sacar() 
    }

    conta.balence = parseFloat(conta.balence) - parseFloat(valor)

    fs.writeFileSync(
        `contas/${nomeDaConta}.json`,
        JSON.stringify(conta),
        function(err){
            console.log(err)
        }
        )
        console.log(chalk.green.black('Saque efetuado com Sucesso!!'))
        operacoes()
}