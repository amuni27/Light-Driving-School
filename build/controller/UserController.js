"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserServiceImpl_1 = require("../services/impl/UserServiceImpl");
class UserController {
    constructor() {
        this.addUser = (req, res) => {
            this.userService.addUser(req.body)
                .then(data => res.status(201).send(data))
                .catch(err => res.status(400).send({ error: err.message }));
        };
        this.updateUser = (req, res) => {
            this.userService.updateUser(req.params.id, req.body)
                .then(data => res.status(201).send({ response: "Successfully Updated" }))
                .catch(err => res.status(400).send({ error: err.message }));
        };
        this.getUsers = (req, res) => {
            this.userService.findUser(req.params.id)
                .then(data => res.status(200).send(data))
                .catch(err => res.status(400).json(err.message));
        };
        this.deleteUser = (req, res) => {
            this.userService.deleteUser(req.params.id)
                .then(data => res.status(201).send({ response: "Successfully Deleted" }))
                .catch(err => res.status(400).json({ error: err.message }));
        };
        this.getAllUsers = (req, res) => {
            this.userService.findAllUser()
                .then(data => res.status(201).send(data))
                .catch(err => res.status(400).json({ error: err.message }));
        };
        this.login = (req, res) => {
            // console.log("Authentication middleware called");
            this.userService.login(req.body)
                .then(data => res.status(201).send(data))
                .catch(err => res.status(400).json({ error: err.message }));
        };
        this.userService = new UserServiceImpl_1.UserServiceImpl();
    }
}
exports.UserController = UserController;
