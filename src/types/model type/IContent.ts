import mongoose from "mongoose";

export interface IContent extends Document {
    type: string;
    title: string;
    addedBy: mongoose.Types.ObjectId;
    contentNumber: number;
    lessonId: mongoose.Types.ObjectId;
}