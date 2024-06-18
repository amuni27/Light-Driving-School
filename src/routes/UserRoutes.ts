import express from 'express';
import {UserController} from "../controller/UserController";
import {AuthController} from "../middlewares/auth";
import {Authorization} from "../middlewares/authorization";

const auth=new AuthController();
const authorization=new Authorization();

const userController = new UserController();

const router = express.Router();


router.post('/', userController.addUser);

router.put('/:id',auth.authenticate, authorization.isAdmin, userController.updateUser);

router.delete('/:id',auth.authenticate, authorization.isAdmin, userController.deleteUser);

router.get('/:id',auth.authenticate, authorization.isAdmin, userController.getUsers);

router.get('/',auth.authenticate, authorization.isAdmin, userController.getAllUsers);

router.post('/login',userController.login);

export default router;