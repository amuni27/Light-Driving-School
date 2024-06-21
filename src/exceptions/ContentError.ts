export class ContentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}