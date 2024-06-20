import express from 'express';
import {AuthController} from "../middlewares/auth";
import {QuizController} from "../controller/QuizController";


const router = express.Router();

const quizController = new QuizController();

const authController = new AuthController();


router.post("/", authController.authenticate, quizController.addQuiz);

router.put("/:id", quizController.updateQuiz);

router.delete("/:id", authController.authenticate, quizController.deleteQuiz);

router.get("/:id", quizController.findQuiz)

router.get("/", quizController.findAllQuiz)

export default router;