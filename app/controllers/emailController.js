
const nodemailer = require('nodemailer');
const emailConfig = require('../mail/email');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth : {
        user: emailConfig.getGmail(),
        auth: emailConfig.getGmailPass()
    }
}); 

const sendEmail = async (mail) => {
    try {
        const config = {
            from: mail.from,
            to: mail.to,
            subject: mail.subject, 
            html: mail.body
        }
    
        const info = await transporter.sendMail(config); 

        console.log(`Email sent : ${info.response}`); 
        
    } catch (error) {
        console.trace(error);
    }
}; 

const emailController = {

    sendEmailConfirmation: (req, res) => {
        const mail = {
            to : req.body.email,
            subject : 'Mooxy email test',
            body: 'This a email for test purposes'
        }

        sendEmail(mail); 

        res.redirect('/'); 
    }, 



}

module.exports = emailController ;