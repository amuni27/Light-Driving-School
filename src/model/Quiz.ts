import mongoose, {Schema} from "mongoose";

const QuizSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    lessonId: {type: Schema.Types.ObjectId, ref: 'Lesson', required: true}, // Reference to course document
    questions: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
        number: {type: Number, required: true, unique: true},
    }],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
});

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;