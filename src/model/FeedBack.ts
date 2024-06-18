import mongoose, {Schema} from "mongoose";

const FeedbackSchema: Schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    course: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
    lesson: {type: Schema.Types.ObjectId, ref: 'Lesson'},
    quiz: {type: Schema.Types.ObjectId, ref: 'Quiz'},
    content: {type: Schema.Types.ObjectId, ref: 'Content'},
    rating: {type: Number, required: true, min: 1, max: 5},
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);