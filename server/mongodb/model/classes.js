import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    className : {
        type : String,
        required : [true, 'ClassName is required']
    },
    section : {
        type : String
    },
    subject : {
        type : String
    },
    createdBy : {
        type : String,
        required : [true, 'Created by whom is required']
    },
    joinedBy : {
        type: [String]
    }
});

const classModel = mongoose.model('classes', classSchema);

export default classModel;