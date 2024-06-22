import express from 'express';
import {CourseController} from "../controller/CourseController";
import {AuthController} from "../middlewares/auth";
import {ProgressController} from "../controller/ProgressController";
import {Authorization} from "../middlewares/authorization";


const router = express.Router();

const progressController = new ProgressController();

const authController = new AuthController();

const authorization = new Authorization();


router.post("/", authController.authenticate, authorization.isAdmin, progressController.initializeProgress);

router.put("/:studentId", authController.authenticate, authorization.isAdmin, progressController.changeStatusOfCourseContent);
//
// router.delete("/:id", authController.authenticate, courseController.deleteCourse);
//
router.get("/:studentId",authController.authenticate , authorization.isAdmin, progressController.getCurrentStudentProgress)
router.get("/:studentId/:courseContentId",authController.authenticate , authorization.isAdmin, progressController.getByCourseContentTypeById)
//
// router.get("/", courseController.findAllCourses)

export default router;