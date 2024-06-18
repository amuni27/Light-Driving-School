"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuizSchema = new mongoose_1.Schema({
    lesson: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Lesson', required: true }, // Reference to course document
    question: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Question', required: true }],
});
