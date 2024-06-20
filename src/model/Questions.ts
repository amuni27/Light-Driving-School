import mongoose, {Model, Schema} from "mongoose";
import {QuestionType} from "../types/QuestionType";
import {ContentConstant} from "../constant/Constant";
import {ContentType} from "../types/ContentType";

const QuestionSchema: Schema = new Schema({
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    type: {type: String, ContentType: ContentConstant, required: true},
    options: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Choice'},
        choiceLetter: {type: String, unique: true},
    }], // Array of options for the question
    correctAnswerIndex: { type: String, required: true }
},{discriminatorKey: 'question'})

const Question:Model<QuestionType> = mongoose.model<QuestionType>("Question", QuestionSchema)


export default Question