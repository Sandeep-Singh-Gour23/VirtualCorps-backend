const express = require("express");
const router  = express.Router();
const UserAuthController=require("../controllers/index").UserAuthController;
const HrController=require("../controllers/index").HrController;
const PmController=require("../controllers/PM/pmController")

const VerifyUserJWT=require("../middleware/jwt").VerifyUserJWT;

//AUTHENTICATION routes
router.post('/signup',UserAuthController.SignUp);
router.post('/login',UserAuthController.Login);
router.post('/changeuserpassword',VerifyUserJWT,UserAuthController.ChangePassword);
//router.post('/logOut',VerifyUserJWT,UserAuthController.LogOut);



// HR Controllers route
router.post('/createProject',VerifyUserJWT,HrController.CreateProject);
router.post('/assignProject',VerifyUserJWT,HrController.AssignProject);
//router.post('/createTeam',HrController.CreateTeam);
router.get('/getAllProjects',VerifyUserJWT,HrController.GetAllProjects);
router.get('/unassignedProjectManager',VerifyUserJWT,HrController.UnassignedPM);
router.get('/getAllProjectManager',HrController.getAllPM);
router.get('/getProjects',HrController.GetProjects);
router.get('/getAllTLsTMs',VerifyUserJWT,HrController.TeamMembersDetails);



// PM Controllers route
//router.post('/createTask',VerifyUserJWT,PmController.CreateTask);
//router.post('/scheduleMeet',VerifyUserJWT,PmController.ScheduleMeet);
router.post('/scheduleMeet',PmController.ScheduleMeet);






//CHECK ROUTES
router.get("/check",(req,res)=>{
    console.log("Value fetched from token userid, accHash, email")
   // console.log(req.user.empId);
    //console.log(req.user.role);
    //console.log(req.user.email);

res.send("Welcome ! Everything is perfect")
});

/*router.get("/checkHeroku",(req,res)=>{
    res.send("Welcome ! Heroku deployement is perfectly done")
});*/



module.exports = router;