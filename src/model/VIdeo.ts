import {Schema} from "mongoose";
const VideoSchema = new Schema({
    title: {type:String, required:true},
    url: {type:String, required:true},
    description: {type:String},
})