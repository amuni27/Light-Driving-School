export class ProgressError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ProgressError';
    }
}