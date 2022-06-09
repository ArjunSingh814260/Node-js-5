const { signUpschemaVli, signValidator } = require("../validator/validator");
let user = require("../model/user.schema");
const bcrypt = require("bcrypt");
const tokenGenrator = require("../middleware/tockenGenrator");
const { any } = require("joi");

class userController {
  signUp = async (req, res) => {
    try {
      req.body;
      let { fName, lName, email, password } = req.body;

      if (!req.file) {
        return res
          .status(400)
          .json({ message: "Please Upload Photo", success: false });
      }

      const result = await signUpschemaVli.validateAsync(req.body, {
        abortEarly: false,
      });

      const userInfo = await user.findOne({ email });

      if (!userInfo) {
        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);
        const userData = new user({
          fName,
          lName,
          email,
          password,
          path: req.file.path,
        });

        const token = await tokenGenrator(userData._id);

        await userData.save();
        const maxAge = 3 * 24 * 60 * 60 * 1000;

        return res.status(201).json({
          message: "User created successfully",
          status: true,
          jwt: token,
        });
      } else {
        return res.status(409).json({
          message: "User already exists",
          status: false,
        });
      }
    } catch (err) {
      if (err.isJoi == true) {
        err.status = 401;

        return res.status(400).json({ message: err.message, success: false });
      } else {
        return res.status(500).json({ message: err.message, success: false });
      }
    }
  };
  signIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await signValidator.validateAsync(req.body);

      const userInfo = await user.findOne({ email });
      if (userInfo) {
        const passwordResult = await bcrypt.compare(
          password,
          userInfo.password
        );
        if (passwordResult) {
          const token = tokenGenrator(userInfo._id);

          return res.status(200).json({
            message: "User  successfully",
            status: true,
            token,
          });
        } else {
          return res
            .status(401)
            .json({ message: "incorrect Password", success: true });
        }
      } else {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }
    } catch (err) {
      if (err.isJoi == true) {
        err.status = 422;

        return res
          .status(err.status)
          .json({ message: err.message, success: false });
      } else {
        return res.status(500).json({ message: err.message, success: false });
      }
    }
  };

  profileView = async (req, res) => {
    try {
      const userInfo = await user.findOne(
        { _id: req.user },
        { _id: 0, password: 0 }
      );

      return res.status(200).json(userInfo);
    } catch (e) {
      console.log(e);
    }
  };

  profileChanger = async (req, res) => {
    ("profile Changer");
    req.user;
    const id = req.user;
    ("profile Changer");
    if (id) {
      const userInfo = await user.findOneAndUpdate(
        { _id: id },
        { path: req.file.path },
        { new: true }
      );

      return res.status(200).json({
        message: "profile pic successfully changed",
        success: true,
        data: userInfo.path,
      });
    }
  };
}

module.exports = new userController();
