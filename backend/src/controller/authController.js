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
     // code here
     try {
          const { email, password } = req.body
          const remember_me = req.body.rememberMe;

          var authFlag = false

          const active_user = await Employee.findOne({ email: email });

          if (!active_user)
               return res.send(200).json({ errorMsg: "Invalid email or password" })

          // assumed account password is already hashed
          const isPasswordValid = await active_user.comparePassword(password)
          if (!isPasswordValid) {
               // force, compare text
               if (password === active_user.password) {
                    // [TO UPDATE] :: uncomment once session is set up
                    // req.session.user = active_user;
                    return res.send(200).json( active_user )
               }
               // case that none really matched
               else
                    return res.send(200).json({ errorMsg: "Invalid email or password" })
          }

          // [TO UPDATE] :: uncomment once session is set up
          // req.session.user = active_user;

          if (remember_me)
               req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; 

          return res.send(200).json( active_user )
     } catch(error) {
          return res.send(200).json({ errorMsg: "An error occured. Please refresh the page and try again." })
     }
}

/**
 *   Handle log out feature
 *        > destroy session
 *        > clear cookie
 *        > redirect to log in page
 */
const logoutUser = async (req, res) => {
     // code here
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