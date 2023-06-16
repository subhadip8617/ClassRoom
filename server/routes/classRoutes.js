import express from "express";
import { createClassController, joinClassController } from "../controllers/classCtrl.js";
import authMiddleware from "../middleware/authMiddleware.js";
import addIDFromEmailMiddleware from "../middleware/addIDFromEmailMiddleware.js";

const classRouter = express.Router();

classRouter.get('/', (req, res) => {
    res.send('Hello From ClassRoutes');
})

classRouter.post('/createClass', authMiddleware, createClassController);
classRouter.post('/joinClass', authMiddleware, joinClassController);

export default classRouter;