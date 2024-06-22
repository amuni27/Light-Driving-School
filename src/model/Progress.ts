import mongoose, {Schema} from "mongoose";
import {Status} from "../constant/Constant";

const BaseProgressSchema = new Schema({
    kind: { type: String, required: true },
    status: { type: String, enum: Status, default: Status.IN_PROGRESS }
}, { discriminatorKey: 'kind', _id: false });

// Specific progress schemas
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
});

const ContentProgressSchema = new Schema({
    contentId: Schema.Types.ObjectId,
});

const LessonProgressSchema = new Schema({
    lessonId: Schema.Types.ObjectId,
});

const ModuleProgressSchema = new Schema({
    moduleId: Schema.Types.ObjectId,
});

// Adding base progress schema to each type using discriminators
const QuestionProgress = BaseProgressSchema.discriminator('QuestionProgress', QuestionProgressSchema);
const QuizProgress = BaseProgressSchema.discriminator('QuizProgress', QuizProgressSchema);
const ContentProgress = BaseProgressSchema.discriminator('ContentProgress', ContentProgressSchema);
const LessonProgress = BaseProgressSchema.discriminator('LessonProgress', LessonProgressSchema);
const ModuleProgress = BaseProgressSchema.discriminator('ModuleProgress', ModuleProgressSchema);

// Main Progress Schema
const ProgressSchema = new Schema({
    studentId: Schema.Types.ObjectId,
    courseId: Schema.Types.ObjectId,
    courseContent: [BaseProgressSchema],
    finalTestProgress: {
        testId: Schema.Types.ObjectId,
        completedQuestions: [QuestionProgressSchema],
        score: Number,
        status: { type: String, enum: Status, default: Status.IN_PROGRESS }
    }
},{timestamps: true});

const Progress = mongoose.model('Progress', ProgressSchema);

export default Progress;