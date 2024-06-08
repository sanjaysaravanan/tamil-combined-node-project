import jwt from "jsonwebtoken";
import express from "express";
import { userModel } from "../../db-utils/models.js";

const verifyUserRouter = express.Router();

verifyUserRouter.post("/", async (req, res) => {
  const { token } = req.body;

  try {
    console.log("jwt_secret", process.env.JWT_SECRET);
    console.log(token);
    const data = jwt.verify(token, process.env.JWT_SECRET);

    console.log("dadas", data);

    await userModel.updateOne(
      { email: data.email },
      {
        $set: { isVerified: true },
      }
    );

    res.send({ msg: "User verified Successfully", code: 1 });
  } catch (err) {
    console.log(err);
    res.status(403).send({ msg: "Failed User Verification", code: -1 });
  }
});

export default verifyUserRouter;
