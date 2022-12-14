import Prof from "../models/profSchema.js";
import College from "../models/collegesSchema.js";

var collegeDept
const profList = {
    profList: function(req, res){
        collegeDept = req.params.department;

        console.log(collegeDept)
        Prof.find({department: collegeDept},function(err, result){
            if(err){
                console.log(err);
            }
            else{
                res.render('prof_list',{
                    dept: collegeDept,
                    prof_profile: result,
                    // Prof: result, 
                    user: req.user})
            }
        })
    },

    searchFilter: function(req, res){
        const search = req.body.search;

        Prof.find({ name: { $regex: "${search}" , $options: "i" } },function(err, result){
            if(err){
                console.log(err);
            }
            else{
               
                res.render('prof_list',{
                    dept: collegeDept,
                    prof_profile: result
                    // Prof: result
                })
            }
        })
    }
}


export default profList;