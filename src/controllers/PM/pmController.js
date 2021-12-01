const {
    okResponse,
    badRequestError,
    to,
    unverifiedError,
  } = require("../../../global_functions");
  const Project = require("../../models/projectModel");
  const Employee = require("../../models/employeeModel");
  const Meeting = require("../../models/meetingSchedule");


  //Schedule the meet 

  const ScheduleMeet = async (req, res) => {
    console.log(req.body);
   // console.log(req.user.empId);
    //let empId=req.user.empId;
    let { meetDate, meetTime, teamName } = req.body;
   if (teamName === "") return badRequestError(res, "Project Name can not be empty");
  
    //inserting Meeting Schedule details
    let [err, meet_scheduled] = await to(
      Meeting.query()
      .insert({ meetDate: meetDate, meetTime: meetTime, scheduleFor: teamName })
      .returning("*")
    
    );
    if (err) badRequestError(res, "unable to insert meeting schedule details");
  
    console.log("Meeting details ", meet_scheduled);
    return okResponse(res, "Meet Scheduled successfully");
  };
  
   // Getting All projects of PM

   const GetPMProjects = async (req, res) => {
  
    let userId= req.user.empId;
    console.log(userId);
  
    let [err, GetPMProjects] = await to(
      
  
      Project.query().where("assignedTo",userId)
      );
    if (err) badRequestError(res, "unable to fetch data");
  
    console.log("Fetched Data ", GetPMProjects);
    return okResponse(res,GetPMProjects, "Data fatched successfully");
  };
  




  module.exports = {
    ScheduleMeet,
    GetPMProjects
}
