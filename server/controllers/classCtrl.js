import classModel from "../mongodb/model/classes.js";
import userModel from "../mongodb/model/users.js";

const createClassController = async (req, res) => {
    try {
        req.body.createdBy = req.body.userId;
        const newClass = new classModel(req.body);
        await newClass.save();
        const creatorUserID = newClass.createdBy;
        await userModel.findByIdAndUpdate(creatorUserID, {
            "$push" : {"createdClasses" : newClass._id}
        });
        return res.status(200).send({
            success : true,
            msg : "New Class Created"
        })
    } catch (error) {
        return res.status(500).send({
            success : false,
            msg : error
        })
    }
}

const joinClassController = async(req, res) => {
    try {
        const curUserId = req.body.userId;
        const classId = req.body.classId;

        const curClass = await classModel.findById(classId);
        if(!curClass){
            return res.status(200).send({
                success: false,
                msg: "Class Not Found"
            })
        }
        if(curClass.createdBy == curUserId){
            return res.status(200).send({
                success: false,
                msg: "Creator Cannot Join The Same Class"
            })
        }

        await classModel.findByIdAndUpdate(classId, {
            "$push" : {"joinedBy" : curUserId}
        })

        await userModel.findByIdAndUpdate(curUserId, {
            "$push" : {"joinedClasses" : classId}
        })

        res.status(200).send({
            success: true,
            msg: "Joined Successfully"
        })
    } catch (error) {
        res.status(500).send({success: false, msg: error})
    }
}

export {
    createClassController,
    joinClassController
}