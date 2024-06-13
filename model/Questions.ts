import mongoose, {Schema} from "mongoose";

const QuestionSchema: Schema = new Schema({
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true }, // Reference to quiz document
    question: { type: Schema.Types.Mixed, required: true },
    options: [{ type: Schema.Types.Mixed, required: true }], // Array of options for the question
    correctAnswerIndex: { type: Number, required: true }, // Index of the correct answer in the options array
})

const Question = mongoose.model("Question", QuestionSchema)

export default Question