import mongoose, {Model, Schema} from "mongoose";
import {QuestionType} from "../types/QuestionType";
import {ContentConstant} from "../constant/Constant";
import ChoiceSchema from "./Choice";

const QuestionSchema: Schema = new Schema({
    quizId: {type: Schema.Types.ObjectId, ref: 'Quiz', required: true},
    type: {type: String, ContentType: ContentConstant, required: true},
    options: [ChoiceSchema], // Array of options for the question
    correctAnswerLetter: {type: String, required: true},
    questionNumber: {type: Number, required: true},
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {discriminatorKey: 'question',timestamps: true}, )

const Question: Model<QuestionType> = mongoose.model<QuestionType>("Question", QuestionSchema)


export default Question