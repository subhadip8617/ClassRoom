import userModel from "../mongodb/model/users.js";
import classModel from "../mongodb/model/classes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({email : req.body.email});
        if(existingUser){
            return res.status(200).send({
                success: false,
                msg: "User Already Exists"
            })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        req.body.password = hashedPass;
        const newUser = new userModel(req.body);
        await newUser.save();
        return res.status(200).send({
            success: true,
            msg: "User Created Successfully"
        })
    } catch (error) {
        return res.status(500).send({success: false, msg: error})
    }
}

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({email : req.body.email});
        if(!user){
            return res.status(200).send({
                success: false,
                msg: "User Not FOund"
            })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({
                success: false,
                msg: "Password doesn't match"
            })
        }
        // 10 days => 10d || 5 minutes => 5m
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '10d'});
        res.status(200).send({
            success: true,
            msg: `Hello ${user.userName} Logged In Successfully`,
            token
        })
    } catch (error) {
        res.status(500).send({success: false, msg: error})
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        if(!user){
            return res.status(200).send({
                msg: 'User Not Found',
                success: false
            })
        }
        else{
            let created = [];
            let joined = [];
            for(let i = 0; i < user.createdClasses.length; i++){
                let curClass = await classModel.findById(user.createdClasses[i]);
                const curClassCreator = await userModel.findById(curClass.createdBy);
                let cur = {
                    _id : curClass._id,
                    className : curClass.className,
                    section : curClass.section,
                    subject : curClass.subject,
                    creator : curClassCreator.userName
                }
                created.push(cur);
            }
            // console.log(created)
            for(let i = 0; i < user.joinedClasses.length; i++){
                let curClass = await classModel.findById(user.joinedClasses[i]);
                const curClassCreator = await userModel.findById(curClass.createdBy);
                let cur = {
                    _id : curClass._id,
                    className : curClass.className,
                    section : curClass.section,
                    subject : curClass.subject,
                    creator : curClassCreator.userName
                }
                joined.push(cur);
            }
            return res.status(200).send({
                success: true,
                data: {
                    userName: user.userName,
                    email: user.email,
                    createdClasses: created,
                    joinedClasses: joined
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: error,
            success: false
        });
    }
}

export {
    registerController,
    loginController,
    authController,
}