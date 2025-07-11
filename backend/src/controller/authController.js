/**
 *   AUTHENTICATION CONTROLLER
 *        > handles login, logout, and signup
 */

const mongoose = require('mongoose');
const Employee = require('../model/employee');

// ================================================== //

/**
 *   Renders the log in page
 */
const renderLoginPage = async (req, res) => {
     // code here
}

/**
 *   Handles logging in, username and password must match
 *   @returns  active_user : an Employee object (if success)
 *             errorMsg if fail
 */
const loginUser = async (req, res) => {
     try {
          const { email, password } = req.body
          const remember_me = req.body.rememberMe;

          const active_user = await Employee.findOne({ email: email });

          if (!active_user)
               return res.send(200).json({ errorMsg: "Invalid email or password" })

          // assumed account password is already hashed
          const isPasswordValid = await active_user.comparePassword(password)
          if (!isPasswordValid) {
               // force, compare text
               if (password === active_user.password) {
                    req.session.user = active_user;
                    return res.send(200).json( active_user )
               }
               // case that none really matched
               else
                    return res.send(200).json({ errorMsg: "Invalid email or password" })
          }

          req.session.user = active_user;

          if (remember_me)
               req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; 

          return res.send(200).json( active_user )
     } catch(error) {
          return res.send(200).json({ errorMsg: "An error occured. Please refresh the page and try again." })
     }
}

/**
 *   Handles log out feature
 *   @returns true
 */
const logoutUser = async (req, res) => {
     req.session.destroy();
     res.clearCookie('connect.sid');

     // [TO UPDATE], ask what to return for log out
     return res.send(200).json( true )
}

/**
 *   Handle sign up account feature
 *        > only ADMIN has access
 *        > assigns password and username to other employees
 * 
 *   SUGGESTION:
 *        > randomly generate password
 */
const signUpUser = async (req, res) => {
     // code here
}