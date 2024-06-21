import {Status} from "../../constant/Constant";
import Course from "../../model/Course";
import {ContentProgress, IProgress, LessonProgress, ModuleProgress} from "../../types/model type/IProgress";
import {ProgressService} from "../ProgressService";
import Modules from "../../model/Modules";
import Lesson from "../../model/Lesson";
import Content from "../../model/Content";
import Progress from "../../model/Progress";
import {ProgressError} from "../../exceptions/ProgressError";

export class ProgressServiceImpl implements ProgressService {


    async initializeProgress(studentId: string, courseId: string): Promise<boolean> {
        try {
            const progress: IProgress = {
                studentId: studentId,
                courseId: courseId,
                modules: [],
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
                    moduleId: module._id,
                    lessons: [],
                    status: Status.IN_PROGRESS,
                };

                // Sort and process lessons
                const sortedLessons = module.lessons.sort((a, b) => a.number - b.number);
                for (const lessonRef of sortedLessons) {
                    const lesson = await Lesson.findById(lessonRef._id);
                    if (!lesson) {
                        throw new ProgressError('Lesson not found');
                    }

                    const lessonProgress: LessonProgress = {
                        lessonId: lesson._id,
                        contents: [],
                        status: Status.IN_PROGRESS,
                    };
                    if (lesson.quiz) {
                        lessonProgress.quizProgress = {quizId: lesson.quiz.toString(), status: Status.IN_PROGRESS}
                    }

                    // Sort and process contents
                    const sortedContents = lesson.contents.sort((a, b) => a.number - b.number);
                    for (const contentRef of sortedContents) {
                        const content = await Content.findById(contentRef._id);
                        if (!content) {
                            throw new ProgressError('Content not found');
                        }

                        const contentProgress: ContentProgress = {
                            contentId: content._id,
                            status: Status.IN_PROGRESS,
                        };

                        lessonProgress.contents.push(contentProgress);
                    }

                    moduleProgress.lessons.push(lessonProgress);
                }

                progress.modules.push(moduleProgress);
            }

            const saveProgress = await Progress(progress)
            const savedProgress = saveProgress.save()
            return true;
        } catch (error) {
            console.error('Error initializing progress:', error);
            throw new ProgressError('Error deleting module to course:' + error);
        }
    }
}