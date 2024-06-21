import mongoose from "mongoose";

export interface ICourse extends Document {
    title: string;
    description: string;
    modules: Array<{ _id: mongoose.Types.ObjectId; number: number }>;
    addedBy: mongoose.Types.ObjectId;
}