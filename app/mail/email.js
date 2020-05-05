const email = {

    gmail: process.env.GMAILADD,
    password: process.env.GMAILPASS,

    getGmail: () => {
        return email.gmail; 
    }, 

    getGmailPass: () => {
        return email.password; 
    }

}

module.exports = email ;