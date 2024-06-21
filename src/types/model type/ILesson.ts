import mongoose from "mongoose";

export interface ILesson extends Document {
    title: string;
    description: string;
    contents: Array<{ _id: mongoose.Types.ObjectId; number: number }>;
    addedBy: mongoose.Types.ObjectId;
    lessonNumber: number;
    moduleId: mongoose.Types.ObjectId;
    quiz: mongoose.Types.ObjectId;
}