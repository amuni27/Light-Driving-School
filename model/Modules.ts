import mongoose, {Schema} from "mongoose";

const ModuleSchema: Schema = new Schema({
    title: {type: String, required: true},
    lessons: [{type: Schema.Types.ObjectId, ref: 'Lesson'}], 
});

const Module = mongoose.model("Module", ModuleSchema);
export default Module;