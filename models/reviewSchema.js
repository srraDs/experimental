import mongoose from 'mongoose';

const reviewsSchema = {
    username: String,
    reviewContent: String,
    course: String,
    likes: 0,
    prof: String,
    prof_id: String,
    //profile_pic: String
};

const Review = mongoose.model("Review", reviewsSchema);

export default Review;
