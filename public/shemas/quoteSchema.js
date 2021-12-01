import mongoose from 'mongoose'
const {Schema} = mongoose;



const contactSchema = new Schema({
    name: String,
    email: String,
    service:String,
    message: String
});