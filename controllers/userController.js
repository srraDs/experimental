import Prof from "../models/profSchema.js";
import Review from "../models/reviewSchema.js";
import mongoose from 'mongoose';

const userPage = {
    load: function(req, res){
        const userID = req.params.userID;
        var dbreviews = [];
        var isRated = 1;
        var sum = [];

        Review.find({username: userID}, null, {sort: {likes: -1}}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                rows.forEach(function(reviews){
                    dbreviews.push({
                        username: reviews.username,
                        id: reviews._id,
                        reviewContent: reviews.reviewContent,
                        course: reviews.course,
                        likes: reviews.likes,
                        prof: reviews.prof,
                        prof: reviews.prof_id})
                });
            }
        
        });
     Prof.find({_id: profID}, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                Review.find({prof_id: profID}, null, {sort: {_id: -1}}, function(err, rows){
                    if(err){
                        console.log(err);
                    }
                    else{
                        Prof.find({_id: profID}, {'rated_userID': {$elemMatch: {userID:req.user.id}}}, function(err, rating){
                            if(err){
                                console.log(err);
                            }
                            else{
                                if(rating[0].rated_userID.length == 0){
                                    isRated = 0;
                                    console.log("walla 2log");
                                }
                                res.render('user_page',{
                                    user: req.user,
                                    dbreviews: dbreviews,
                                    reviews: rows,
                                    prof_profile: result[0],
                                    user_rating: rating[0].rated_userID[0],
                                    isRated: isRated,
                                    sum: sum[0]
                                })
                                
                            }  
                            
                        })
                
                    }   
                
                })
            }
        })
    },
    updateLikes: function(req, res){
        const reviewID = req.body.reviewID;
        const query = {_id: reviewID};
    
        Review.findOneAndUpdate(query, {$inc : { likes: 1 }}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
            
        });
    },
    
    deletePost: function(req, res){
        const reviewID = req.body.reviewID;
        const query = {_id: reviewID};
    
        Review.deleteOne(query, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
            
        });
    },
}