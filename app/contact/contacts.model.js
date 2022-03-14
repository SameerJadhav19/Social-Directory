import mongoose from 'mongoose';
import user from "../user/user.model.js"
import profile from "../profile/profile.model.js"

const contact = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    contacts:[{
        profileId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "profile"
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
        }
    }]
});

const contactLists = mongoose.model("contact", contact)
export default contactLists;