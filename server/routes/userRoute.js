const express = require("express");
const { checkAuth } = require("../middleware/checkauth");
const {
  login,
  signup,
  AllWatchLatter,
  addWatchLatter,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.get("/watchlatter", checkAuth, AllWatchLatter);
router.post("/addWatchLater", checkAuth, addWatchLatter);


router.post("/resetPassword", resetPassword);
// router.get("/logout", logout);

module.exports = router;
