import {CourseService} from "../services/CourseService";
import {CourseServiceImpl} from "../services/impl/CourseServiceImpl";
import {Request, Response} from "express";
import {ProgressService} from "../services/ProgressService";
import {ProgressServiceImpl} from "../services/impl/ProgressServiceImpl";

export class ProgressController {
    progressService: ProgressService;

    constructor() {
        this.progressService = new ProgressServiceImpl();
    }

    initializeProgress = (req: Request, res: Response): void => {
        if (req.user) {
            req.body.addedBy = req.user.id;
            console.log("what's up", req.user.id)
        } else res.status(400).send("You are not logged in.");
        this.progressService.initializeProgress(req.body.studentId, req.body.courseId)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }


}