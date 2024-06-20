import {Request, Response} from "express";
import {ModuleService} from "../services/ModuleService";
import {ModuleServiceImpl} from "../services/impl/ModuleServiceImpl";
import {LessonService} from "../services/LessonService";
import {LessonServiceImpl} from "../services/impl/LessonServiceImpl";
import {QuizService} from "../services/QuizService";
import {QuizServiceImpl} from "../services/impl/QuizServiceImpl";

export class QuizController {
    quizService: QuizService;

    constructor() {
        this.quizService = new QuizServiceImpl();
    }

    addQuiz = (req: Request, res: Response): void => {
        if (req.user) {
            req.body.addedBy = req.user.id;
        } else res.status(400).send("You are not logged in.");
        this.quizService.addQuiz(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    updateQuiz = (req: Request, res: Response): void => {
        this.quizService.updateQuiz(req.params.id, req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    deleteQuiz = (req: Request, res: Response): void => {
        this.quizService.deleteQuiz(req.params.id)
            .then(data => res.status(204).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findQuiz = (req: Request, res: Response): void => {
        this.quizService.findQuiz(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findAllQuiz = (req: Request, res: Response): void => {
        this.quizService.findAllQuiz()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }
}