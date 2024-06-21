export class QuestionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'QuestionError';
    }
}