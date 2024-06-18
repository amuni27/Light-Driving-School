import {Request,Response} from "express";
import {UserService} from "../services/UserService";
import {UserServiceImpl} from "../services/impl/UserServiceImpl";


export class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserServiceImpl()
    }

    addUser = (req: Request, res: Response): void => {
        this.userService.addUser(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).send({error: err.message}))

    }

    updateUser = (req: Request, res: Response) => {
        this.userService.updateUser(req.params.id, req.body)
            .then(data => res.status(201).send({response: "Successfully Updated"}))
            .catch(err => res.status(400).send({error: err.message}))
    }

    getUsers = (req: Request, res: Response) => {
        this.userService.findUser(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).json(err.message))
    }

    deleteUser = (req: Request, res: Response) => {
        this.userService.deleteUser(req.params.id)
            .then(data => res.status(204).send({response: "Successfully Deleted"}))
            .catch(err => res.status(400).json({error: err.message}))
    }

    getAllUsers = (req: Request, res: Response) => {
        this.userService.findAllUser()
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).json({error: err.message}))
    }

    login = (req: Request, res: Response) => {
        // console.log("Authentication middleware called");
        this.userService.login(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(400).json({error: err.message}))
    }

}