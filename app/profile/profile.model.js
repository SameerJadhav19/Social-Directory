import mongoose from 'mongoose';
import user from "../user/user.model.js"

const profileSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    interests: [String]
},
{timestamps: true,})

const profile = mongoose.model('profile', profileSchema)
export default profile;