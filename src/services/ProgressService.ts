
export interface ProgressService {
     initializeProgress(studentId: string, courseId: string):Promise<boolean>;
}