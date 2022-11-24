const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(function(req,res){forgotPassword});

router.route("/password/reset/:token").put(function(req,res){resetPassword});

router.route("/logout").get(function(req,res){logout});

router.route("/me").get(isAuthenticatedUser, function(req,res){getUserDetails});

router.route("/password/update").put(isAuthenticatedUser, function(req,res){updatePassword});

router.route("/me/update").put(isAuthenticatedUser, function(req,res){updateProfile});

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), function(req,res){getAllUser});

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), function(req,res){getSingleUser})
  .put(isAuthenticatedUser, authorizeRoles("admin"), function(req,res){updateUserRole})
  .delete(isAuthenticatedUser, authorizeRoles("admin"), function(req,res){deleteUser});

module.exports = router;