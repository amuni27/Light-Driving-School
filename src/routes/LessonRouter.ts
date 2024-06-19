import express from 'express';
import {AuthController} from "../middlewares/auth";
import {LessonController} from "../controller/LessonController";


const router = express.Router();

const lessonController = new LessonController();

const authController = new AuthController();


router.post("/", authController.authenticate, lessonController.addLesson);

router.put("/:id", lessonController.updateLesson);

router.delete("/:id", authController.authenticate, lessonController.deleteLesson);

router.get("/:id", lessonController.findLesson)

router.get("/", lessonController.findAllLesson)

export default router;