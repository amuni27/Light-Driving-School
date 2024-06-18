"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LessonSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    contents: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Content' }],
    quiz: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Quiz' },
});
