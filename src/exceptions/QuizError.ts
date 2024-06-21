export class QuizError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'QuizError';
    }
}