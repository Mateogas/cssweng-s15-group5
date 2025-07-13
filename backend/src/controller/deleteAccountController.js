const mongoose = require("mongoose");
const Employee = require('../model/employee')
const Sponsored_Member = require('../model/sponsored_member')

const deleteAccount = async (req, res) => {
     // get the account to be deleted
     var account_selected
     if (mongoose.Types.ObjectId.isValid(req.params.account)) 
          account_selected = await Employee.findById(req.params.account)
     else
          account_selected = await Employee.findOne({ email: req.params.account })

     // active user; assuming sessions are already working
     const active_user = req.session.user

     // security checks
     if (!account_selected)
          return res.send(200).json({ message: "Employee not found." })

     if (!active_user)
          return res.send(200).json({ message: "Unauthorized access." })

     if (active_user === account_selected)
          return res.send(200).json({ message: "Unauthorized access. You cannot delete your own account." })

     var SDWexists
     var SVexists

     // SDW should be cleared of all their cases
     if (account_selected.role === "sdw" || account_selected.role === "SDW") {
          SDWexists = await Sponsored_Member.exists({
               assigned_sdw: account_selected._id,
               is_active: true
          });

          if (SDWexists)
               return res.send(200).json({ message: "SDW has active case(s)." })
     } 
     
     // Supervisor must not have SDWs under them and active cases
     if (account_selected.role === "super" || account_selected.role === "Super" ||  account_selected.role === "Supervisor") {
          SVexists = await Employee.exists({ manager: account_id });
          SDWexists = await Sponsored_Member.exists({
               assigned_sdw: account_selected._id,
               is_active: true
          });

          if (SVexists)
               return res.send(200).json({ message: "Supervisor has SDW under them." })
          if (SDWexists)
               return res.send(200).json({ message: "Supervisor has active case(s)." })
     }

     // Head must not have supervisors/SDWs under them and active cases
     if (account_selected.role === "head" || account_selected.role === "Head") {
          SVexists = await Employee.exists({ manager: account_id });
          SDWexists = await Sponsored_Member.exists({
               assigned_sdw: account_selected._id,
               is_active: true
          });

          if (SVexists)
               return res.send(200).json({ message: "Head has employees under them." })
          if (SDWexists)
               return res.send(200).json({ message: "Head has active case(s)." })
     }

     // Delete
     await Employee.findByIdAndDelete(account_selected._id);

     // Query all employees again for return; must be updated
     const employees = await Employee.find();
     return res.status(200).json({ message: "Account deleted successfully", employees });
}

module.export = {
     deleteAccount
}