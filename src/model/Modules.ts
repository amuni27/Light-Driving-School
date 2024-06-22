import mongoose, {Schema} from "mongoose";
import {IModule} from "../types/model type/IModule";

const ModuleSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    lessons: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Lesson'},
        number: {type: Number, required: true},
    }],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    moduleNumber: {type: Number, required: true},
    courseId:{type: Schema.Types.ObjectId, ref: 'Course'}
},{timestamps: true});

const Module = mongoose.model<IModule>("Module", ModuleSchema);
export default Module;