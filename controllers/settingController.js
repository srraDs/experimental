import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import db from "../models/db.js";


const settingsCont = {
    getSettings: function(req, res) {
        // const userID = req.params.userID;
        // res.render('settings', {user: req.user});
        const userID = req.params.userID;

        User.find({_id: userID}, function(err, result){
            if(err){
                console.log(err);
            }else{
                res.render('settings', {user: req.user})
            }
        })
    },

    updateUsername: function(req, res){ 
        const userID = req.params.userID;
        const username = req.body.username;
        const query = {_id: userID};
    
        User.updateOne(query, {username: username}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                console.log(username);
                res.redirect('/home');
            }
            
        });
    },

    updateEmail: function(req, res){
        const userID = req.params.userID;
        const email = req.body.email;
        const query = {_id: userID};
    
        User.updateOne(query, {email: email}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                console.log(email);
                res.redirect('/login');
            }
            
        });
    },

    updatePassword: async function(req, res){
        const userID = req.params.userID;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const query = {_id: userID};
    
        User.updateOne(query, {password: hashedPassword}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                console.log(hashedPassword);
                res.redirect('/login');
            }
            
        });
    }
}

export default settingsCont;