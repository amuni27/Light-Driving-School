import express from 'express';
import {AuthController} from "../middlewares/auth";
import {QuestionsController} from "../controller/QuestionsController";
import {Authorization} from "../middlewares/authorization";


const router = express.Router();

const questionsController = new QuestionsController();

const authController = new AuthController();

const authorization = new Authorization();


router.post("/", authController.authenticate, authorization.isAdmin, questionsController.addQuestion);

router.put("/:id", authController.authenticate, authorization.isAdmin, questionsController.updateQuestion);

router.delete("/:id", authController.authenticate, authorization.isAdmin, questionsController.deleteQuestion);

router.get("/:id", questionsController.findQuestion)

router.get("/", questionsController.findAllQuestion)

export default router;