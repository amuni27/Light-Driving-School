import mongoose from "mongoose";

export interface IModule extends Document {
    title: string;
    description: string;
    lessons: Array<{ _id: mongoose.Types.ObjectId; number: number }>;
    addedBy: mongoose.Types.ObjectId;
    moduleNumber: number;
    courseId: mongoose.Types.ObjectId;
}