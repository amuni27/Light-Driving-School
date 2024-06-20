import mongoose, {Model, Schema} from "mongoose";
import {ContentConstant} from "../constant/Constant";
import {ContentType} from "../types/ContentType";

const ContentSchema: Schema = new Schema({
    type: {type: String, ContentType: ContentConstant, required: true},
    title: {type: String, required: true},
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    contentNumber: {type: Number, required: true},
    lessonId: {type: Schema.Types.ObjectId, ref: 'Lesson'},
}, {discriminatorKey: 'content'});

const Content: Model<ContentType> = mongoose.model<ContentType>('Content', ContentSchema);
export default Content;