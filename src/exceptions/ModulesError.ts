export class ModulesError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ModulesError';
    }
}