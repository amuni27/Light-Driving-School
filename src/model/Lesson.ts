import { Schema } from "mongoose";

const LessonSchema: Schema = new Schema({
    title: { type: String, required: true },
    contents: [{ type: Schema.Types.ObjectId, ref: 'Content' }],
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
});
