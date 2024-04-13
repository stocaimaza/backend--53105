const passport = require("passport");

const passportCall = (strategy) => {
    return async ( req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if(error) {
                return next(error);
            }
            if(!user) {
                res.status(401).send({error: info.message ? info.message : info.toString() })
            }

            req.user = user;
            next();
        }) (req, res, next)
    }
}

module.exports = {
    passportCall
}