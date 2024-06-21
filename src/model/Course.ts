import mongoose, {Schema} from "mongoose";
import {ICourse} from "../types/model type/ICourse";

const CourseSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    modules: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Module'},
        number: {type: Number, unique: true},

    }],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

const Course = mongoose.model<ICourse>('Course', CourseSchema);

export default Course;