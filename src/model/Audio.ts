import mongoose, {Model, Schema} from 'mongoose';
import Content from "./Content";
import {AudioType} from "../types/ContentType";
import {QuestionAudioType} from "../types/QuestionType";
import Question from "./Questions";

const audioSchema = new Schema({
    url: {type: String, required: true},
    description: {type: String, required: true},
})
const AudioContent: Model<AudioType> = Content.discriminator<AudioType>('Audio', audioSchema);
const AudioQuestion: Model<QuestionAudioType> = Question.discriminator<QuestionAudioType>('AudioQuestion', audioSchema)
export  {AudioQuestion, AudioContent}