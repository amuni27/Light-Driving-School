import {Status} from "../../constant/Constant";
import Course from "../../model/Course";
import {
    BaseProgress,
    ContentProgress,
    IProgress,
    LessonProgress,
    ModuleProgress,
    QuestionProgress, QuizProgress
} from "../../types/model type/IProgress";
import {ProgressService} from "../ProgressService";
import Modules from "../../model/Modules";
import Lesson from "../../model/Lesson";
import Content from "../../model/Content";
import Progress from "../../model/Progress";
import {ProgressError} from "../../exceptions/ProgressError";
import {Schema, Types} from "mongoose";
import {ObjectId} from 'mongodb'


export class ProgressServiceImpl implements ProgressService {


    async initializeProgress(studentId: string, courseId: string): Promise<boolean> {
        try {
            const progress: IProgress = {
                studentId: studentId,
                courseId: courseId,
                courseContent: [],
            };

            const course = await Course.findById(courseId);

            if (!course) {
                throw new ProgressError('Course not found');
            }

            // Sort and process modules
            const sortedModules = course.modules.sort((a, b) => a.number - b.number);
            for (const moduleRef of sortedModules) {
                const module = await Modules.findById(moduleRef._id);
                if (!module) {
                    throw new ProgressError('Module not found');
                }

                const moduleProgress: ModuleProgress = {
                    kind: 'ModuleProgress',
                    moduleId: module._id,
                    status: Status.IN_PROGRESS
                };

                progress.courseContent.push(moduleProgress);

                // Sort and process lessons
                const sortedLessons = module.lessons.sort((a, b) => a.number - b.number);
                for (const lessonRef of sortedLessons) {
                    const lesson = await Lesson.findById(lessonRef._id);
                    if (!lesson) {
                        throw new ProgressError('Lesson not found');
                    }

                    const lessonProgress: LessonProgress = {
                        kind: 'LessonProgress',
                        lessonId: lesson._id,
                        status: Status.IN_PROGRESS
                    };

                    progress.courseContent.push(lessonProgress);


                    // Sort and process contents
                    const sortedContents = lesson.contents.sort((a, b) => a.number - b.number);
                    for (const contentRef of sortedContents) {
                        const content = await Content.findById(contentRef._id);
                        if (!content) {
                            throw new ProgressError('Content not found');
                        }

                        const contentProgress: ContentProgress = {
                            kind: 'ContentProgress',
                            contentId: content._id,
                            status: Status.IN_PROGRESS
                        };

                        progress.courseContent.push(contentProgress);
                    }
                    if (lesson.quiz) {
                        const quizProgress: QuizProgress = {
                            kind: 'QuizProgress',
                            quizId: lesson.quiz.toString(),
                            score: 0,
                            status: Status.IN_PROGRESS
                        };

                        progress.courseContent.push(quizProgress);
                    }
                }
            }

            const newProgress = new Progress(progress);
            await newProgress.save();
            return true;
        } catch (error) {
            console.error('Error initializing progress:', error);
            throw new ProgressError('Error initializing progress: ' + error);
        }
    }


    async getCurrentStudentProgress(studentId: string): Promise<any[]> {
        const progress: any[] = await Progress.aggregate([
            {
                '$match': {
                    'studentId': new ObjectId(studentId)
                }
            }, {
                '$project': {
                    'courseContent': 1
                }
            }, {
                '$project': {
                    'currentProgressCourseContent': {
                        '$arrayElemAt': [
                            {
                                '$filter': {
                                    'input': '$courseContent',
                                    'as': 'courseContents',
                                    'cond': {
                                        '$eq': [
                                            '$$courseContents.status', 'IN_PROGRESS'
                                        ]
                                    }
                                }
                            }, 0
                        ]
                    },
                    'index': {
                        '$indexOfArray': [
                            '$courseContent._id', {
                                '$arrayElemAt': [
                                    {
                                        '$filter': {
                                            'input': '$courseContent',
                                            'as': 'courseContents',
                                            'cond': {
                                                '$eq': [
                                                    '$$courseContents.status', 'IN_PROGRESS'
                                                ]
                                            }
                                        }
                                    }, 0
                                ]
                            }
                        ]
                    }
                }
            }
        ])
        if (progress.length <= 0) {
            throw new ProgressError('No Progress Found');
        }
        return progress;
    }

    async getByCourseContentTypeById(studentId: string, courseContentId: string): Promise<any> {
        console.log("studentId", studentId)
        console.log("co", courseContentId)
        const progress = await Progress.aggregate([
            {
                '$match': {
                    'studentId': new ObjectId(studentId)
                }
            }, {
                '$unwind': '$courseContent'
            }, {
                '$match': {
                    'courseContent._id': new ObjectId(courseContentId)
                }
            }, {
                '$project': {
                    '_id': '$courseContent._id',
                    'kind': '$courseContent.kind',
                    'status': '$courseContent.status',
                    'moduleId': '$courseContent.moduleId'
                }
            }
        ])
        if (!progress) {
            throw new ProgressError('No Progress Course content Found');
        }
        return progress;
    }

    async changeStatusOfCourseContent(studentId: string, courseContentId: string): Promise<boolean> {
        console.log(studentId, "string", courseContentId, "string")

        try {


            const progress = await Progress.findOneAndUpdate(
                { studentId: new ObjectId(studentId) }, // Filter by course ID
                {
                    $set: {
                        "courseContent.$[updateElement].status": Status.COMPLETED, // Update status
                    },
                },
                {
                    arrayFilters: [{ "updateElement._id": courseContentId }], // Filter within array
                }

            )

            if (!progress) {
                throw new ProgressError('Progress status can not updated');
            }
            return true
        } catch (erorr) {
            throw new ProgressError(`Progress status can not updated because of ${erorr}`);
        }
    }

}