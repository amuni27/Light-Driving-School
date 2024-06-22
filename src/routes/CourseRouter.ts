import express from 'express';
import {CourseController} from "../controller/CourseController";
import {AuthController} from "../middlewares/auth";
import {Authorization} from "../middlewares/authorization";


const router = express.Router();

const courseController = new CourseController();

const authController = new AuthController();
const authorization= new Authorization();


router.post("/",authController.authenticate, authorization.isAdmin, courseController.addCourse);

router.put("/:id",authController.authenticate, authorization.isAdmin, courseController.updateCourse);

router.delete("/:id",authController.authenticate, authorization.isAdmin, authController.authenticate, courseController.deleteCourse);

router.get("/:id", courseController.findCourse)

router.get("/", courseController.findAllCourses)

export default router;