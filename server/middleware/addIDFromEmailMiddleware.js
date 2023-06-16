import userModel from "../mongodb/model/users.js";

const addIDMiddleware = async (req, res, next) => {
    try {
      const existingUser = await userModel.findOne({email: req.body.email});
      req.body.createdBy = existingUser._id;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({
        msg: "Failed in addUserNameAuth",
        success: false,
      });
    }
  };
  
  export default addIDMiddleware;