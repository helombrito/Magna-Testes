var database = require("../database/config");
 // esqueci minha senha
const nodemailer = require("nodemailer");


function listar () {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM shopping;
    `;
    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar (email, senha) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function validar (email) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    var instrucao = `
        SELECT * FROM usuario WHERE emailUsuario = '${email}';
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}





function novaSenha(senha, email){


    var instrucao = ` update usuario set senha = '${senha}'  where emailUsuario = '${email}'`
    return database.executar(instrucao);


}
// esqueci minha senha
async function enviar_email(email) {
  

   
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "magna.sptech@gmail.com", // generated ethereal user
            pass: "M@gna2020", // generated ethereal password
        },
    });
    // enviando email com o objeto de transporte definido 
    let info = await transporter.sendMail({
        from: '"Magna" <magna.sptech@gmail.com>', // Endereço de email de quem esta enviando
        to: `${email}`, // lista de enviados
        subject: "Recuperação de senha.", // Subject line
        text: "Acesse o link para criar sua nova senha.", // plain text body
        html: "<b>Acesse o link para criar sua nova senha.</b><br> ", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar (nome, cnpj, tel, email, senha) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, tel);
    var instrucao = `INSERT INTO shopping (nomeShopping, cnpj, telefone) VALUES ('${nome}', '${cnpj}', '${tel}');`;
    //console.log("Executando a instrução SQL: \n" + instrucao);
    var instrucao2 = `INSERT INTO usuario (email, senha) VALUES ('${email}','${senha}');`;
           database.executar(instrucao2);
    return database.executar(instrucao);
}

module.exports = {
    entrar: entrar,
    cadastrar: cadastrar,
    listar: listar,
    validar: validar,
    enviar_email: enviar_email,
    novaSenha:novaSenha
   
};