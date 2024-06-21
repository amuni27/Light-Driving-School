import express from 'express';
import {CourseController} from "../controller/CourseController";
import {AuthController} from "../middlewares/auth";
import {ProgressController} from "../controller/ProgressController";


const router = express.Router();

const progressController = new ProgressController();

const authController = new AuthController();


router.post("/", authController.authenticate, progressController.initializeProgress);

// router.put("/:id", courseController.updateCourse);
//
// router.delete("/:id", authController.authenticate, courseController.deleteCourse);
//
// router.get("/:id", courseController.findCourse)
//
// router.get("/", courseController.findAllCourses)

export default router;