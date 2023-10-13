import express from "express";
import passport from "passport";
import { getAdminAllUsers, getAdminStats, getMyProfile, logout } from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google"),
  // passport.authenticate("google", {
  //   successRedirect: process.env.FRONTEND_URL,
  // })
  (req, res, next) => {
    res.send("Login successfully");
  }
);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

//! Admin Routes
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminAllUsers);
router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);
export default router;
