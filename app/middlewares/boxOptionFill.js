

const boxOptions = ["fragile", "heavy", "floor"];  

const boxOptionFiller = (req,res,next) => {
    for (data of boxOptions) {

        if (!req.body.hasOwnProperty(data)) {
            req.body[data] = false; 
        } else {
            req.body[data] = true;
        }
    }

    console.log('req.body in MW :>> ', req.body);
    next(); 
}

module.exports = boxOptionFiller ;