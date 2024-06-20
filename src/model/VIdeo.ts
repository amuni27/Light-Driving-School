import {Model, Schema} from "mongoose";
import Content from "./Content";
import {VideoType} from "../types/ContentType";
import {QuestionAudioType, QuestionVideoType} from "../types/QuestionType";
import Question from "./Questions";

const videoSchema = new Schema({
    url: {type: String, required: true},
    description: {type: String},
})

const VideoContent: Model<VideoType> = Content.discriminator<VideoType>('Video', videoSchema);
const VideoQuestion: Model<QuestionVideoType> = Question.discriminator<QuestionVideoType>('VideoQuestion', videoSchema)
export  {VideoContent,VideoQuestion}
