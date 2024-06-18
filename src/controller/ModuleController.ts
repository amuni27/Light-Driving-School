import {Request, Response} from "express";
import {ModuleService} from "../services/ModuleService";
import {ModuleServiceImpl} from "../services/impl/ModuleServiceImpl";

export class ModuleController {
    moduleService: ModuleService;

    constructor() {
        this.moduleService = new ModuleServiceImpl();
    }

    addModule = (req: Request, res: Response): void => {
        if (req.user) {
            req.body.addedBy = req.user.id;
            console.log("what's up", req.user.id)
        } else res.status(400).send("You are not logged in.");
        this.moduleService.addModules(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    updateModule = (req: Request, res: Response): void => {
        this.moduleService.updateModules(req.params.id, req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    deleteModule = (req: Request, res: Response): void => {
        this.moduleService.deleteModules(req.params.id)
            .then(data => res.status(204).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findModule = (req: Request, res: Response): void => {
        this.moduleService.findModules(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }

    findAllModules = (req: Request, res: Response): void => {
        this.moduleService.findAllModules()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send({error: err.message}))
    }
}