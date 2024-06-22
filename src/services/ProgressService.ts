
export interface ProgressService {
     initializeProgress(studentId: string, courseId: string):Promise<boolean>;
     getCurrentStudentProgress(studentId:string): Promise<any[]>
}