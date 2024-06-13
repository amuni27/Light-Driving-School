import {Schema} from "mongoose";

const TextSchema: Schema = new Schema({
    title: {type:String, required:true},
    description: {type: String, required: true},
})