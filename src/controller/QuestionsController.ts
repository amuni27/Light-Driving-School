import {Request, Response} from "express";
import {QuestionService} from "../services/QuestionService";
import {QuestionServiceImpl} from "../services/impl/QuestionServiceImpl";

export class QuestionsController {
    questionsService: QuestionService;

    constructor() {
        this.questionsService = new QuestionServiceImpl();
    }

    addQuestion = (req: Request, res: Response): void => {
        if (req.user) {
            req.body.addedBy = req.user.id
        } else res.status(400).send("You are not logged in.");
        this.questionsService.addQuestion(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    updateQuestion = (req: Request, res: Response): void => {
        this.questionsService.updateQuestion(req.params.id, req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    deleteQuestion = (req: Request, res: Response): void => {
        this.questionsService.deleteQuestion(req.params.id)
            .then(data => res.status(204).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findQuestion = (req: Request, res: Response): void => {
        this.questionsService.findQuestion(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findAllQuestion = (req: Request, res: Response): void => {
        this.questionsService.findAllQuestion()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }
}