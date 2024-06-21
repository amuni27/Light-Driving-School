import mongoose from "mongoose";

export interface IQuestion extends Document {
    quizId: mongoose.Types.ObjectId;
    type: string;
    options: any[]; // Replace 'any' with a more specific type if possible
    correctAnswerLetter: string;
    questionNumber: number;
    addedBy: mongoose.Types.ObjectId;
}