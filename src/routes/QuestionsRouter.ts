import express from 'express';
import {AuthController} from "../middlewares/auth";
import {QuestionsController} from "../controller/QuestionsController";


const router = express.Router();

const questionsController = new QuestionsController();

const authController = new AuthController();


router.post("/", authController.authenticate, questionsController.addQuestion);

router.put("/:id", questionsController.updateQuestion);

router.delete("/:id", authController.authenticate, questionsController.deleteQuestion);

router.get("/:id", questionsController.findQuestion)

router.get("/", questionsController.findAllQuestion)

export default router;