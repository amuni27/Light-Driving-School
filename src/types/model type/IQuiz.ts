import mongoose from "mongoose";

export interface IQuiz extends Document {
    title: string;
    description: string;
    lessonId: mongoose.Types.ObjectId;
    questions: Array<{ _id: mongoose.Types.ObjectId; number: number }>;
    addedBy: mongoose.Types.ObjectId;
}