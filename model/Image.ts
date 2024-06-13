import Content from "./Content";

const ImageContent = new Content({
    title: String,
    url: {type: String, required: true},
    description: String,
})
