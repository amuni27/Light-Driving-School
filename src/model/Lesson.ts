import mongoose, {Schema} from "mongoose";
import {ILesson} from "../types/model type/ILesson";

const LessonSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    contents: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Content'},
        number: {type: Number, required: true}
    }],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    lessonNumber: {type: Number, required: true},
    moduleId:{type: Schema.Types.ObjectId, ref: 'Module'},
    quiz: {type: Schema.Types.ObjectId, ref: 'Quiz'},
},{timestamps: true});

const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);
export default Lesson;

