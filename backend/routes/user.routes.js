const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");
const upload = require("../helper/multer");
const verify = require("../middleware/verify");

router.post("/", upload.single("file"), userController.signUp);
router.post("/signin", upload.single("file"), userController.signIn);
router.post("/profileview", verify, userController.profileView);
router.post(
  "/profilechange",
  verify,
  upload.single("file"),
  userController.profileChanger
);

module.exports = router;
