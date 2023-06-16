import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: [true, 'Name is required']
    },
    email : {
        type: String,
        required: [true, 'Email is required']
    },
    password : {
        type: String,
        required: [true, 'Password is required']
    },
    createdClasses : {
        type: [String]
    },
    joinedClasses : {
        type : [String]
    }
});

const userModel = mongoose.model('users', UserSchema);
export default userModel;