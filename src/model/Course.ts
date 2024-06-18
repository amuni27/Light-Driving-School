import mongoose, {Schema} from "mongoose";

const CourseSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    modules: [{type: Schema.Types.ObjectId, ref: 'Module'}],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

const Course = mongoose.model('Course', CourseSchema);

export default Course;