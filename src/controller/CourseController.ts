import {CourseService} from "../services/CourseService";
import {CourseServiceImpl} from "../services/impl/CourseServiceImpl";
import {Request, Response} from "express";

export class CourseController {
    courseService: CourseService;

    constructor() {
        this.courseService = new CourseServiceImpl();
    }

    addCourse = (req: Request, res: Response): void => {
        if (req.user) {
            req.body.addedBy = req.user.id;
            console.log("what's up", req.user.id)
        } else res.status(400).send("You are not logged in.");
        this.courseService.addCourse(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    updateCourse = (req: Request, res: Response): void => {
        this.courseService.updateCourse(req.params.id, req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    deleteCourse = (req: Request, res: Response): void => {
        this.courseService.deleteCourse(req.params.id)
            .then(data => res.status(204).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findCourse = (req: Request, res: Response): void => {
        this.courseService.findCourse(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findAllCourses = (req: Request, res: Response): void => {
        this.courseService.findAllCourse()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }
}