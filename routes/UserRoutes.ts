import express = require('express');
import {UserController} from "../controller/UserController";

const userController = new UserController();

const router = express.Router();


router.post('/', userController.addUser);

router.delete('/:id', userController.deleteUser);

router.get('/:id', userController.getUsers);

router.get('/', userController.getAllUsers);

export default router;