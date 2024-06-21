import {Status} from "../constant/Constant";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuestionProgressSchema = new Schema({
    questionId: Schema.Types.ObjectId,
    answer: String,
    isCorrect: Boolean,
    numberOfAttempts: Number,
});


const QuizProgressSchema = new Schema({
    quizId: Schema.Types.ObjectId,
    completedQuestions: [QuestionProgressSchema],
    score: Number,
    status: {type: String, enum: Status, default: Status.IN_PROGRESS}
});

const ContentProgressSchema = new Schema({
    contentId: Schema.Types.ObjectId,
    status: {type: String, enum: Status, default: Status.IN_PROGRESS},
});

const LessonProgressSchema = new Schema({
    lessonId: Schema.Types.ObjectId,
    contents: [ContentProgressSchema],
    status: {type: String, enum: Status, default: Status.IN_PROGRESS},
    quizProgress: QuizProgressSchema
});

const ModuleProgressSchema = new Schema({
    moduleId: Schema.Types.ObjectId,
    lessons: [LessonProgressSchema],
    status: {type: String, enum: Status, default: Status.IN_PROGRESS},
});

const ProgressSchema = new Schema({
    studentId: Schema.Types.ObjectId,
    courseId: Schema.Types.ObjectId,
    modules: [ModuleProgressSchema],
    finalTestProgress: {
        testId: Schema.Types.ObjectId,
        completedQuestions: [QuestionProgressSchema],
        score: Number,
        status: {type: String, Status, default: Status.IN_PROGRESS}
    }
});

const Progress = mongoose.model('Progress', ProgressSchema);

export default Progress
