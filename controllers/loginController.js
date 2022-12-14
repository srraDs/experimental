//import passportMiddle from "../configs/passport.js";
import passport from "passport";

const loginController = {
    getLogin: function(req, res){
        res.render('login')
    },

    userAuthenticate: function(req, res, next){
        console.log("passport authenticating")
        passport.authenticate("local", {
            successRedirect: "/home",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next);
    }
};

export default loginController;