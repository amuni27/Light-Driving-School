import express from "express";
import {UserService} from "../services/UserService";
import {UserServiceImpl} from "../services/impl/UserServiceImpl";
import {UserType} from "../type/UserType";
import {UserResponseDTO} from "../dto/UserResponseDTO";

export class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserServiceImpl()
    }

    addUser = (req: express.Request, res: express.Response): void => {
        this.userService.addUser(req.body).then(data => res.status(201).send(data)).catch(err => {
            console.log("error", err)
            res.status(400).send(err)
        })

    }

    updateUser = (req: express.Request, res: express.Response) => {
    }

    getUsers = (req: express.Request, res: express.Response) => {
        this.userService.findUser(req.params.id).then(data => res.status(200).send(data)).catch(err => {
            res.status(400).json(err)
        })
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        this.userService.deleteUser(req.params.id).then(data => res.status(201).send(data)).catch(err => {
            res.status(400).json(err)
        })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        this.userService.findAllUser().then(data => res.status(201).send(data)).catch(err => {
            res.status(400).json(err)
        })
    }

}