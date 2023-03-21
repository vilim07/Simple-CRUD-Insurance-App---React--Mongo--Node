import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
    },
    city: {
        type: String, 
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
})
const User = mongoose.model('Users', userSchema)

export default User