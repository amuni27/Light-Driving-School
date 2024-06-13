import {Schema} from "mongoose";

const QuizSchema: Schema = new Schema({
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true }, // Reference to course document
    question: [{ type: Schema.Types.ObjectId, ref: 'Question', required: true }],
});