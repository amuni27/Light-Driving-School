import mongoose, {Schema} from "mongoose";

const ModuleSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    lessons: [{type: Schema.Types.ObjectId, ref: 'Lesson'}],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    moduleNumber: {type: Number, required: true},
    courseId:{type: Schema.Types.ObjectId, ref: 'Course'}
});

const Module = mongoose.model("Module", ModuleSchema);
export default Module;