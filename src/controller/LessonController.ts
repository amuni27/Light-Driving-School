import {Request, Response} from "express";
import {ModuleService} from "../services/ModuleService";
import {ModuleServiceImpl} from "../services/impl/ModuleServiceImpl";
import {LessonService} from "../services/LessonService";
import {LessonServiceImpl} from "../services/impl/LessonServiceImpl";

export class LessonController {
    lessonService: LessonService;

    constructor() {
        this.lessonService = new LessonServiceImpl();
    }

    addLesson = (req: Request, res: Response): void => {
        if (req.user) {
            req.body.addedBy = req.user.id;
        } else res.status(400).send("You are not logged in.");
        this.lessonService.addLesson(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    updateLesson = (req: Request, res: Response): void => {
        this.lessonService.updateLesson(req.params.id, req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    deleteLesson = (req: Request, res: Response): void => {
        this.lessonService.deleteLesson(req.params.id)
            .then(data => res.status(204).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findLesson = (req: Request, res: Response): void => {
        this.lessonService.findLesson(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findAllLesson = (req: Request, res: Response): void => {
        this.lessonService.findAllLesson()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }
}