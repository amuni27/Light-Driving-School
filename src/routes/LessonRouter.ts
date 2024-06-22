import express from 'express';
import {AuthController} from "../middlewares/auth";
import {LessonController} from "../controller/LessonController";
import {Authorization} from "../middlewares/authorization";


const router = express.Router();

const lessonController = new LessonController();

const authController = new AuthController();

const authorization= new Authorization()


router.post("/",authController.authenticate, authorization.isAdmin, lessonController.addLesson);

router.put("/:id",authController.authenticate, authorization.isAdmin, lessonController.updateLesson);

router.delete("/:id",authController.authenticate, authorization.isAdmin, authController.authenticate, lessonController.deleteLesson);

router.get("/:id", lessonController.findLesson)

router.get("/", lessonController.findAllLesson)

export default router;