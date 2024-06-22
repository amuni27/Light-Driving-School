import express from 'express';
import {AuthController} from "../middlewares/auth";
import {QuizController} from "../controller/QuizController";
import {Authorization} from "../middlewares/authorization";


const router = express.Router();

const quizController = new QuizController();

const authController = new AuthController();
const authorization = new Authorization();


router.post("/", authController.authenticate, authorization.isAdmin, quizController.addQuiz);

router.put("/:id", authController.authenticate, authorization.isAdmin, quizController.updateQuiz);

router.delete("/:id", authController.authenticate, authorization.isAdmin, authController.authenticate, quizController.deleteQuiz);

router.get("/:id", quizController.findQuiz)

router.get("/", quizController.findAllQuiz)

export default router;