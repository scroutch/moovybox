const nodemailer = require('nodemailer');

require('dotenv').config(); 

const password = process.env.SMTPPASSWORD; 
const mailUser = process.env.SMTPUSER;

const html = `
<body>
<header>

<h1>    Activation Mail    </h1>

</header>

<p class='email-body'>
        Tu es pret à activer ton compte MoovyBox ?
        Clique juste sur le bouton ci-dessous...
</p>

<input type="submit" value="Pret à Cartonner!">

<footer>

    <a href=""> J'arrete tout! Les cartons c'est pas mon truc, moi j'aime bien les origamis </a>

</footer>
   
</body>`

let transportGmail  = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
       user: mailUser,
       pass: password
    }, 
    tls: 443
});

const message = {
    from: process.env.SMTPUSER, // Sender address
    to: process.env.SMTPUSER,         // List of recipients
    subject: 'Bienvenue sur Moovybox', // Subject line
    html: html// Plain text body
};

transportGmail.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
});


module.exports = 
