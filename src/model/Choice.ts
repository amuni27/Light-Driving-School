import {Schema} from "mongoose";
import {ContentConstant} from "../constant/Constant";

const ChoiceSchema = new Schema({
    choiceLetter: {type: String},
    type: {type: String, ContentConstant, required: true},
    content: {
        text: {type: String},
        imageUrl: {type: String},
        videoUrl: {type: String},
        description: {type: String},
    }
}, {discriminatorKey: 'content'})

export default ChoiceSchema;