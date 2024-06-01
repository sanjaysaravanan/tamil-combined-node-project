import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../../db-utils/models.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const userData = req.body; // email, password

  // Check if the user already exists
  const userObj = await userModel.findOne({ email: userData.email });

  if (userObj) {
    // Login to handle successful login
    // verify the password send success message only if the password is correct

    bcrypt.compare(userData.password, userObj.password, function (err, result) {
      // result == true
      if (err) {
        res.status(500).send({ msg: "Something went wrong" });
      } else {
        if (result) {
          res.status(200).send({ msg: "User Successfully Logged in", code: 1 });
        } else {
          res.status(400).send({ msg: "User Credentials Failed", code: 0 });
        }
      }
    });
  } else {
    res.status(404).send({ msg: "User not found" });
  }
});

export default loginRouter;
