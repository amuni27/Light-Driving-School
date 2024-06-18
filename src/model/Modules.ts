import mongoose, {Schema} from "mongoose";

const ModuleSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    lessons: [{type: Schema.Types.ObjectId, ref: 'Lesson'}],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Module = mongoose.model("Module", ModuleSchema);
export default Module;