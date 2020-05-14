const sendMail = require('./index');

module.exports = async (emailData) => {
    return await sendMail(emailData); 
}