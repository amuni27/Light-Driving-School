import mongoose, {Schema} from "mongoose";

const CourseSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: String,
    modules: [{type: Schema.Types.ObjectId, ref: 'Module'}]
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;