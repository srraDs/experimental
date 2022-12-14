import db from "../models/db.js";


const controller = {

    getIndex: function(req, res) {
        res.render("register")
    } 
}

export default controller;