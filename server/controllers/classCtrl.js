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

        if(curClass.joinedBy.includes(curUserId)){
            return res.status(200).send({
                success: false,
                msg: "Already Joined The Same Class"
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

const classDetailsController = async(req, res) => {
    try {
        const classId = req.body.classId;
        const curClass = await classModel.findById(classId);
        if(!curClass){
            return res.status(200).send({
                success: false,
                msg: "Class Not Found"
            })
        }
        const curClassCreator = (await userModel.findById(curClass.createdBy)).userName;
        let joinedUsers = []
        for(let i = 0; i < curClass.joinedBy.length; i++){
            const cur = (await userModel.findById(curClass.joinedBy[i])).userName;
            joinedUsers.push(cur);
        }
        return  res.status(200).send({
            success : true,
            data : {
                className : curClass.className,
                section : curClass.section,
                createdBy : curClassCreator,
                joinedBy : joinedUsers,
                messages : curClass.messages
            }
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            msg : error
        })
    }
}

const deleteClassController = async (req, res) => {
    try {
        const curUserId = req.body.userId;
        const classId = req.body.classId;
        const curClass = await classModel.findById(classId);
        if(!curClass){
            return res.status(200).send({
                success : false,
                msg : "Class does not exists"
            })
        }
        if(curClass.createdBy != curUserId){
            return res.status(200).send({
                success : false,
                msg : "Only creator can delete a class"
            })
        }
        await userModel.updateOne({
            _id : curUserId
        }, {
            $pull : {
                createdClasses : classId
            }
        });
        for(let i = 0; i < curClass.joinedBy.length; i++){
            const curJoinerId = curClass.joinedBy[i];
            await userModel.updateOne({
                _id : curJoinerId
            }, {
                $pull : {
                    joinedClasses : classId
                }
            });
        }
        await classModel.deleteOne({_id : classId});
        return res.status(200).send({
            success : true,
            msg : "Class Deleted Successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success : false,
            msg : error
        })
    }
}

export {
    createClassController,
    joinClassController,
    classDetailsController,
    deleteClassController
}