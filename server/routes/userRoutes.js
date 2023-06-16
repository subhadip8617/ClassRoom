import express from "express";
import {registerController, loginController, authController} from "../controllers/userCtrl.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('Hello');
})

userRouter.post('/login', loginController);
userRouter.post('/register', registerController);
userRouter.post('/getUserData', authMiddleware, authController);

export default userRouter;