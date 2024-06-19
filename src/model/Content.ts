import mongoose, {Schema} from "mongoose";
import {ContentType} from "../constant/Constant";

const ContentSchema: Schema = new Schema({
    type: {type: String, ContentType, required: true},
    content: {type: Schema.Types.Mixed},
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    contentNumber: {type: Number, required: true},
    lessonId: {type: Schema.Types.ObjectId, ref: 'Lesson'},
});

const Contents = mongoose.model('Content', ContentSchema);
export default Contents;