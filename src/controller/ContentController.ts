import {Request, Response} from "express";
import {ContentServiceImpl} from "../services/impl/ContentServiceImpl";
import {ContentService} from "../services/ContentService";

export class ContentController {
    ContentService: ContentService;

    constructor() {
        this.ContentService = new ContentServiceImpl();
    }

    addContent = (req: Request, res: Response): void => {
        if (req.user) {
            req.body.addedBy = req.user.id;
        } else res.status(400).send("You are not logged in.");
        this.ContentService.addContent(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    updateContent = (req: Request, res: Response): void => {
        this.ContentService.updateContent(req.params.id, req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    deleteContent = (req: Request, res: Response): void => {
        this.ContentService.deleteContent(req.params.id)
            .then(data => res.status(204).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findContent = (req: Request, res: Response): void => {
        this.ContentService.findContent(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findAllContent = (req: Request, res: Response): void => {
        this.ContentService.findAllContent()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }
}