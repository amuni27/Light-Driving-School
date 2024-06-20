import {Model, Schema} from "mongoose";
import Content from "./Content";
import {VideoType} from "../types/ContentType";

const videoSchema = new Schema({
    url: {type: String, required: true},
    description: {type: String},
})

const VideoContent:Model<VideoType> = Content.discriminator<VideoType>('Video', videoSchema);
export default VideoContent;
