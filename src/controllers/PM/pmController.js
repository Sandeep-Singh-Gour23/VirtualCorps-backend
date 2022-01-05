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

  // Assign project to team member

  
  const AssignTask = async (req, res) => {
    console.log(req.body);
    let { empId , projectName } = req.body;
    if (empId === "") return badRequestError(res, "empId can not be null");
   if (projectName === "") return badRequestError(res, "Project Name can not be empty");

   let [error, result] = await to(Employee.query().select("isAssigned").where("empId", empId).first());
  if (error) console.log(error);
  console.log(result);
  /*if (result.isAssigned === true) {
    return badRequestError(res, "This Project Manager is already Assigned");
  }*/
  let [error2, result2] = await to(Project.query().select("projectStatus").where("projectName", projectName).first());
  if (error2) console.log(error2);
  console.log(result2);
  if (result2.projectStatus === "assigned") {
    return badRequestError(res, "This Project is already Assigned");
  }
  
    //inserting Assigned Project Manager into Project table
    let [err, assign_project] = await to(
      Project.query()
      .update({ assignedTo: empId, projectStatus:"assigned" })
      .where("projectName", projectName)
      .returning("*")
    
    );
    if (err) badRequestError(res, "Failed in Assigning project to Project Manager");
  
    console.log("Updated ", assign_project);

    //updating Project Manager's Profile
    let [err2, update_PM_Profile] = await to(
      Employee.query()
      .update({ isAssigned: "true" })
      .where("empId", assign_project[0].assignedTo)
      .returning("*")
    
    );
    
    console.log("ERROR IS "+err2);

    let AssignProject={
      assign_project:assign_project,
      update_PM_Profile:update_PM_Profile
    }
     
    console.log(AssignProject);


    return okResponse(res, "Project Assigned successfully to Project Manager");
  };
  




  module.exports = {
    ScheduleMeet,
    GetPMProjects,
    AssignTask
}
