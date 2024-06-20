import Content from "./Content";
import {Model, Schema} from "mongoose";
import {ImageType} from "../types/ContentType";

const imageContentSchema = new Schema({
    url: {type: String, required: true},
    description: {type: String},
});
const ImageContent:Model<ImageType> = Content.discriminator<ImageType>('Image', imageContentSchema);
export default ImageContent;
