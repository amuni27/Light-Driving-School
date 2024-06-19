import mongoose, {Schema} from "mongoose";

const LessonSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    contents: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Content'},
        number: {type: Number, unique: true}
    }],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    lessonNumber: {type: Number, required: true},
    moduleId:{type: Schema.Types.ObjectId, ref: 'Module'},
    quiz: {type: Schema.Types.ObjectId, ref: 'Quiz'},
});

const Lesson = mongoose.model("Lesson", LessonSchema);
export default Lesson;

