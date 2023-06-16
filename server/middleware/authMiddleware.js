import jwt from "jsonwebtoken";

const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err){
            return res.status(200).send({msg: 'Auth Failed', success: false});
        }
        else{
            req.body.userId = decode.id;
            next();
        }
    })
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      msg: "Auth Failed",
      success: false,
    });
  }
};

export default authenticationMiddleware;