import Content from "./Content";

const ImageContent = new Content({
    title: {type: String, required: true},
    url: {type: String, required: true},
    description: {type: String},
})
