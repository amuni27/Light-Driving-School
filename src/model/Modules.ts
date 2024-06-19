import mongoose, {Schema} from "mongoose";

const ModuleSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    lessons: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Lesson'},
        number: {type: Number, unique: true},

    }],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    moduleNumber: {type: Number, required: true},
    courseId:{type: Schema.Types.ObjectId, ref: 'Course'}
});

const Module = mongoose.model("Module", ModuleSchema);
export default Module;