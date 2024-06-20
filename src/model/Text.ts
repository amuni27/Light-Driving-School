import {Model, Schema} from "mongoose";
import Content from "./Content";
import {TextType} from "../types/ContentType";
import {QuestionTextType, QuestionVideoType} from "../types/QuestionType";
import Question from "./Questions";

const textSchema: Schema = new Schema({
    description: {type: String, required: true},
})

const TextContent: Model<TextType> = Content.discriminator<TextType>('Text', textSchema)
const TextQuestion: Model<QuestionTextType> = Question.discriminator<QuestionTextType>('TextQuestion', textSchema)
export {TextContent, TextQuestion}