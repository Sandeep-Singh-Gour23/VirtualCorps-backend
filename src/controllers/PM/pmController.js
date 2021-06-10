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
    console.log(req.user.empId);
    let Name= req.user.fullName;
    let { meetDate, meetTime, teamName } = req.body;
   if (teamName === "") return badRequestError(res, "Project Name can not be empty");
  
    //inserting Meeting Schedule details
    let [err, meet_scheduled] = await to(
      Meeting.query()
      .insert({ meetDate: meetDate, meetTime: meetTime, scheduleBy: Name, teamName: teamName })
      .returning("*")
    
    );
    if (err) badRequestError(res, "unable to insert meeting schedule details");
  
    console.log("Meeting details ", meet_scheduled);
    return okResponse(res, "Meet Scheduled successfully");
  };
  





  module.exports = {
    ScheduleMeet
}
