import express from 'express';
import {CourseController} from "../controller/CourseController";
import {AuthController} from "../middlewares/auth";


const router = express.Router();

const courseController = new CourseController();

const authController = new AuthController();


router.post("/", authController.authenticate, courseController.addCourse);

router.put("/:id", courseController.updateCourse);

router.delete("/:id", authController.authenticate, courseController.deleteCourse);

router.get("/:id", courseController.findCourse)

router.get("/", courseController.findAllCourses)

export default router;