import Content from "./Content";
import {Model, Schema} from "mongoose";
import {ImageType} from "../types/ContentType";
import {QuestionAudioType, QuestionImageType} from "../types/QuestionType";
import Question from "./Questions";
import Module from "node:module";

const imageSchema = new Schema({
    url: {type: String, required: true},
    description: {type: String},
});
const ImageContent: Model<ImageType> = Content.discriminator<ImageType>('Image', imageSchema);
const ImageQuestion: Model<QuestionImageType> = Question.discriminator<QuestionImageType>('ImageQuestion', imageSchema)
// export default ImageContent;
export {ImageContent, ImageQuestion};
