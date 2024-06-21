export class LessonError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'LessonError';
    }
}