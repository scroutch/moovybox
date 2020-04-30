const authChecker = (req, res, next) => {
    // Checker if an authentified user is using the session
    if (req.session.user_id) {
        // if there an authentified user redirect towards his moves page. 
        res.send({message : "there is a user"});
    }

    // if not move on 
    next(); 
}; 

module.exports = authChecker; 