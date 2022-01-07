const inquirer = require('inquirer')

inquirer.prompt([
    {
        name: 'p1', 
        message: 'Quala a primeira nota? '
    },
    {
        name: 'p2', 
        message: 'Quala a segunda nota? '
    }
]).then((resposta)=>{
    console.log(resposta)
    const media = (parseInt(resposta.p1) + parseInt(resposta.p2))/2
    console.log(`a media é ${media}`)
}).catch(erro => console.log(erro))