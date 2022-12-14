import { Router } from "express";
//import flash from "connect-flash";

import authenticateUser from "../configs/authenticateUser.js";

import controller from "../controllers/controller.js";
import deptList from "../controllers/departmentsController.js";
import profList from "../controllers/profListController.js";
import profPage from "../controllers/profPageController.js";
import profReview from "../controllers/profReviewsController.js";

import home from "../controllers/homeController.js";
import registerCont from "../controllers/registerController.js";
import loginCont from "../controllers/loginController.js";

import settingsCont from "../controllers/settingController.js";
import adminCont from "../controllers/adminController.js";


const router = Router();

//from controller.js
router.get('/', controller.getIndex);

//from departmentsController.js
router.get('/profList/:collegeCode', deptList.deptList);

//from registerController.js
router.get('/register', registerCont.getRegister);
router.post('/register', registerCont.newUser);
router.get('/register', registerCont.findUser);

//from loginController.js
router.get('/login', loginCont.getLogin);
router.post('/login', loginCont.userAuthenticate);

//from homeController.js
router.get('/home', authenticateUser.ensureAuthentication, home.collegeList);

//from profListController.js
router.get('/profList/:collegeCode/:department', authenticateUser.ensureAuthentication, profList.profList);
router.post('/profResults/:department', authenticateUser.ensureAuthentication, profList.searchFilter);

//from profPageController.js
router.get('/profPage/:profID', authenticateUser.ensureAuthentication, profPage.load);
router.post('/updateLikes', profPage.updateLikes);
router.post('/saveReview', profPage.saveReview);
router.post('/deletePost', profPage.deletePost);
router.get('/:profID/:userID/1', profPage.oneStar);
router.get('/:profID/:userID/2', profPage.twoStar);
router.get('/:profID/:userID/3', profPage.threeStar);
router.get('/:profID/:userID/4', profPage.fourStar);
router.get('/:profID/:userID/5', profPage.fiveStar);

//from profReviewsController
router.get('/profReviews/:profID/:course', authenticateUser.ensureAuthentication, profReview.load);
router.post('/updateLikes', profReview.updateLikes);

router.get('/logout', function(req, res){
    req.logout( function(error){
        if(error){
            return next(error);
        }
        req.flash("success_msg", "Successfully logged out");
        res.redirect('/login')
    });
    
})

//from settingsController
router.get('/settings/:userID', authenticateUser.ensureAuthentication, settingsCont.getSettings);
router.post('/updateUsername/:userID', settingsCont.updateUsername);
router.post('/updateEmail/:userID', settingsCont.updateEmail);
router.post('/updatePassword/:userID', settingsCont.updatePassword);

//from adminController
router.get('/admin', adminCont.getAdmin);
router.post('/admin', adminCont.newProf);

export default router;
