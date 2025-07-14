const mongoose = require('mongoose');
const Employee = require('../model/employee');
const Sponsored_Member = require('../model/sponsored_member');


/**
 * Retrieves all active sponsored members and all employees for the Head view.
 * - Only accessible by users with the 'Head' role.
 * - Returns simplified lists of sponsored members and employees.
 * - Each sponsored member includes assigned SDW info if available.
 * - Each employee includes basic identifying info and role.
 * 
 * @param {Object} req - Express request object, expects user session or user object.
 * @param {Object} res - Express response object, used to send JSON data or error.
 * @returns {Object} JSON response with 'cases' (sponsored members) and 'employees' arrays.
 */
const getHeadView = async (req, res) => {
  const user = req.session ? req.session.user : req.user;
  try {
    if (!user) {
      return res.status(401).json({ message: "Authentication Error" });
    }

    let cases = [];
    let employee = [];
    
    if (user.role == 'head') {
      cases = await Sponsored_Member.find({ is_active: true })
        .populate('assigned_sdw')
        .lean();

      employee = await Employee.find({}).lean();
    }else{
      return res.status(403).json({ message: "Permission Error: Head access required" });
    }

    // Simplify Sponsored Members
    const simplifiedCases = cases.map(c => ({
      id: c._id,
      name: `${c.first_name} ${c.middle_name || ''} ${c.last_name}`.trim(),
      sm_number: c.sm_number,
      spu: c.spu,
      is_active: c.is_active,
      assigned_sdw: c.assigned_sdw?._id || null,
      assigned_sdw_name: c.assigned_sdw
        ? `${c.assigned_sdw.first_name} ${c.assigned_sdw.middle_name || ''} ${c.assigned_sdw.last_name}`.trim()
        : null
    }));

    // Simplify Employees
    const simplifiedEmployees = employee.map(e => ({
      id: e._id,
      name: `${e.first_name} ${e.middle_name || ''} ${e.last_name}`.trim(),
      sdw_id: e.sdw_id,
      spu: e.spu,
      role: e.role
    }));

    return res.status(200).json({
      cases: simplifiedCases,
      employees: simplifiedEmployees
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
/**
 * Retrieves all active sponsored members and employees for a specific SPU for the Head view.
 * - Only accessible by users with the 'Head' role.
 * - Filters sponsored members and employees by the given SPU.
 * - Each sponsored member includes assigned SDW info if available.
 * - Each employee includes basic identifying info and role.
 * 
 * @param {Object} req - Express request object, expects user session or user object and body.spu.
 * @param {Object} res - Express response object, used to send JSON data or error.
 * @returns {Object} JSON response with 'cases' (sponsored members) and 'employees' arrays.
 */
const getHeadViewbySpu = async (req, res) => {
  const user = req.session ? req.session.user : req.user;
  const spuFilter = req.body.spu
  try {
    if (!user) {
      return res.status(401).json({ message: "Authentication Error what" });
    }

    let cases = [];
    let employee = [];

    if (user.role == 'head') {
      cases = await Sponsored_Member.find({ is_active: true, spu:spuFilter})
        .populate('assigned_sdw')
        .lean();

      employee = await Employee.find({spu_id:spuFilter}).lean();
    }else{
      return res.status(403).json({ message: "Permission Error: Head access required" });
    }


    // Simplify Sponsored Members
    const simplifiedCases = cases.map(c => ({
      id: c._id,
      name: `${c.first_name} ${c.middle_name || ''} ${c.last_name}`.trim(),
      sm_number: c.sm_number,
      spu: c.spu,
      is_active: c.is_active,
      assigned_sdw: c.assigned_sdw?._id || null,
      assigned_sdw_name: c.assigned_sdw
        ? `${c.assigned_sdw.first_name} ${c.assigned_sdw.middle_name || ''} ${c.assigned_sdw.last_name}`.trim()
        : null
    }));

    // Simplify Employees
    const simplifiedEmployees = employee.map(e => ({
      id: e._id,
      name: `${e.first_name} ${e.middle_name || ''} ${e.last_name}`.trim(),
      sdw_id: e.sdw_id,
      spu_id: e.spu_id,
      role: e.role
    }));

    return res.status(200).json({
      cases: simplifiedCases,
      employees: simplifiedEmployees
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Retrieves all active sponsored members and employees for the Supervisor view, filtered by the supervisor's SPU.
 * - Only accessible by users with the 'Supervisor' role.
 * - Excludes employees with roles 'Head', 'head', or 'admin'.
 * - Each sponsored member includes assigned SDW info if available.
 * - Each employee includes basic identifying info and role.
 * 
 * @param {Object} req - Express request object, expects user session or user object.
 * @param {Object} res - Express response object, used to send JSON data or error.
 * @returns {Object} JSON response with 'cases' (sponsored members) and 'employees' arrays.
 */
const getSupervisorViewbySpu = async (req, res) => {
  const user = req.session ? req.session.user : req.user;
  try {
    if (!user) {
      return res.status(401).json({ message: "Authentication Error what" });
    }

    let cases = [];
    let employee = [];

    if (user.role == 'super') {//changed depending on what actual value
      cases = await Sponsored_Member.find({ is_active: true, spu:user.spu_id})
        .populate('assigned_sdw')
        .lean();

       employee = await Employee.find({role: {$nin: ['head','admin']}, spu_id: user.spu_id}).lean(); 
    }else{
      return res.status(403).json({ message: "Permission Error: Supervisor access required" });
    }


    // Simplify Sponsored Members
    const simplifiedCases = cases.map(c => ({
      id: c._id,
      name: `${c.first_name} ${c.middle_name || ''} ${c.last_name}`.trim(),
      sm_number: c.sm_number,
      spu: c.spu,
      is_active: c.is_active,
      assigned_sdw: c.assigned_sdw?._id || null,
      assigned_sdw_name: c.assigned_sdw
        ? `${c.assigned_sdw.first_name} ${c.assigned_sdw.middle_name || ''} ${c.assigned_sdw.last_name}`.trim()
        : null
    }));

    // Simplify Employees
    const simplifiedEmployees = employee.map(e => ({
      id: e._id,
      name: `${e.first_name} ${e.middle_name || ''} ${e.last_name}`.trim(),
      sdw_id: e.sdw_id,
      spu_id: e.spu_id,
      role: e.role
    }));

    return res.status(200).json({
      cases: simplifiedCases,
      employees: simplifiedEmployees
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


/**
 * Retrieves all active sponsored members assigned to the logged-in SDW for the SDW view.
 * - Only accessible by users with the 'sdw' role.
 * - Filters sponsored members by the SDW's user ID and SPU.
 * - Each sponsored member includes assigned SDW info if available.
 * 
 * @param {Object} req - Express request object, expects user session or user object.
 * @param {Object} res - Express response object, used to send JSON data or error.
 * @returns {Object} JSON response with 'cases' (sponsored members) array.
 */

const getSDWView = async (req, res) => {
  const user = req.session ? req.session.user : req.user;
  
  try {
    if (!user) {
      return res.status(401).json({ message: "Authentication Error what" });
    }
    const userId = user._id;
    let cases = [];
    let employee = [];

    if (user.role == 'sdw') {//changed depending on what actual value
      cases = await Sponsored_Member.find({assigned_sdw: userId, is_active: true, spu:user.spu_id})
        .populate('assigned_sdw')
        .lean();
    }else{
      return res.status(403).json({ message: "Permission Error: SDW access required" });
    }


    // Simplify Sponsored Members
    const simplifiedCases = cases.map(c => ({
      id: c._id,
      name: `${c.first_name} ${c.middle_name || ''} ${c.last_name}`.trim(),
      sm_number: c.sm_number,
      spu: c.spu,
      is_active: c.is_active,
      assigned_sdw: c.assigned_sdw?._id || null,
      assigned_sdw_name: c.assigned_sdw
        ? `${c.assigned_sdw.first_name} ${c.assigned_sdw.middle_name || ''} ${c.assigned_sdw.last_name}`.trim()
        : null
    }));
    return res.status(200).json({
      cases: simplifiedCases,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getHeadViewbySupervisor = async(req,res) =>{
    const user = req.session ? req.session.user : req.user;
    const supervisorId = req.params.supervisorId;
    if (!user || !mongoose.Types.ObjectId.isValid(supervisorId)) {
      return res.status(401).json({ message: "Authentication Error" });
    }
    if(user.role != 'head'){//change when needed
    return res.status(401).json({ message: "Permission Error" });
    }
    try{
        let sdws = []

        sdws = await Employee.find({manager:supervisorId})
        .lean()

        const simplifiedsdws = sdws.map(e => ({
        id: e._id,
        name: `${e.first_name} ${e.middle_name || ''} ${e.last_name}`.trim(),
        sdw_id: e.sdw_id,
        spu_id: e.spu_id,
        role: e.role
        }));

        return res.status(200).json(simplifiedsdws);
    }catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });     
    }

}

const getSDWViewbyParam = async(req,res) =>{
    const user = req.session ? req.session.user : req.user;
    const sdwId = req.params.sdwId;
    if (!user || !mongoose.Types.ObjectId.isValid(sdwId)) {
      return res.status(401).json({ message: "Authentication Error" });
    }

    try{
        let cases = []

        cases = await Sponsored_Member.find({assigned_sdw: sdwId, is_active: true})
        .populate('assigned_sdw')
        .lean()

        const simplifiedCases = cases.map(c => ({
        id: c._id,
        name: `${c.first_name} ${c.middle_name || ''} ${c.last_name}`.trim(),
        sm_number: c.sm_number,
        spu: c.spu,
        is_active: c.is_active,
        assigned_sdw: c.assigned_sdw?._id || null,
        assigned_sdw_name: c.assigned_sdw
            ? `${c.assigned_sdw.first_name} ${c.assigned_sdw.middle_name || ''} ${c.assigned_sdw.last_name}`.trim()
            : null
        }));

        return res.status(200).json(simplifiedCases);
    }catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });     
    }

}
module.exports = {
    getHeadView,
    getHeadViewbySpu,
    getSupervisorViewbySpu,
    getSDWView,
    getHeadViewbySupervisor,
    getSDWViewbyParam,
}
