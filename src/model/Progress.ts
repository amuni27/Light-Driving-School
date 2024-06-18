import mongoose, {Schema} from "mongoose";

const ProgressSchema: Schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // Reference to user document
    course: {type: Schema.Types.ObjectId, ref: 'Course', required: true}, // Reference to course document
    completedLessons: [{type: Schema.Types.ObjectId, ref: 'Lesson'}], // Array of completed lesson documents
    quizScores: [{type: Number}], // Array of quiz scores
    overallCompletion: {type: Number, min: 0, max: 100}, // Overall course completion percentage
});

const Progress = mongoose.model("Progress", ProgressSchema);

export default Progress;