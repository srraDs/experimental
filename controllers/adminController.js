import Prof from '../models/profSchema.js';
import db from '../models/db.js';

const adminController = {
    getAdmin: function(req, res){
        res.render('admin', {user: req.user})
    },

    newProf: function(req, res){
        const newProf = new Prof({
            name: req.body.name,
            courses: req.body.courses,
            college: req.body.college,
            department: req.body.department,
            courses_name: req.body.courses_name
        });

        newProf.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Prof Registered");
                req.flash("success_msg", "Prof Registered");
                res.redirect('/home');
            }
        })
        
    }
}

export default adminController;