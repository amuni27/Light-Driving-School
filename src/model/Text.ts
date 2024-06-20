import {Model, Schema} from "mongoose";
import Content from "./Content";
import {TextType} from "../types/ContentType";

const textSchema: Schema = new Schema({
    description: {type: String, required: true},
})

const TextContent:Model<TextType> = Content.discriminator<TextType>('Text', textSchema)
export default  TextContent;