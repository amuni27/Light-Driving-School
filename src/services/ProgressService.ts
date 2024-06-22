export interface ProgressService {
    initializeProgress(studentId: string, courseId: string): Promise<boolean>;

    getCurrentStudentProgress(studentId: string): Promise<any[]>;

    getByCourseContentTypeById(studentId: string, courseContentId: string): Promise<any>;

    changeStatusOfCourseContent(studentId: string, courseContentId: string): Promise<boolean>
}