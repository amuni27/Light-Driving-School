import mongoose, {Model, Schema} from 'mongoose';
import Content from "./Content";
import {AudioType} from "../types/ContentType";

const audioSchema = new Schema({
    url: {type: String, required: true},
    description: {type: String, required: true},
})
const AudioContent:Model<AudioType> = Content.discriminator<AudioType>('Audio', audioSchema);
export default AudioContent;