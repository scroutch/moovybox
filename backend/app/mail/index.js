const nodemailer = require('nodemailer');

require('dotenv').config(); 

const password = process.env.SMTPPASSWORD; 
const mailUser = process.env.SMTPUSER;


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
/*
const message = {
    from: process.env.SMTPUSER, // Sender address
    to: process.env.SMTPUSER,         // List of recipients
    subject: 'Bienvenue sur Moovybox', // Subject line
    html: html// Plain text body
};
*/

const sendMail = async (emailData) => {
  // - Use the email function ({userPseudo, userEmail, userToken})
  try {

    const html = `
    <body>
      <section>
        <header>
          <h1>Activation Mail</h1>
        </header>
      
        <p class='email-body--text'>
                Bonjour ${emailData.userPseudo},
        </p>
        <p class='email-body--text'>
              L'équipe Moovybox est fière de te compter parmi ses utilisateurs, plus qu'une étape.
        </p> 
        
        <a class="confirm-btn" href="http://localhost:5050/confirmation/${emailData.userToken}">Activer mon compte</a>

        <p class='email-body--text'>
              Sinon, clique sur le lien suivant: <a href="http://localhost:5050/confirmation/${emailData.userToken}">http://localhost:5050/confirmation/${emailData.userToken}</a>
        </p> 

        <p class='email-body--text'>
              Attention ces liens ne sont valables que 24h. 
        </p> 
        <footer>
          <a href="">J'arrete tout! Les cartons c'est pas mon truc, moi j'aime bien les origamis</a>
        </footer>

      </section> 
      
    </body>`;
    
    const message = {
      from: process.env.SMTPUSER, // Sender address
      to: emailData.userEmail,  // List of recipients
      subject: `Bienvenue ${emailData.userPseudo} Activer votre compte Moovybox`, // Subject line
      html: html// Plain text body
    };

    const result = await transportGmail.sendMail(message);
    return result; 


  } catch (error) {
    console.trace(error); 
  }
}

module.exports = sendMail;
