import express from 'express';
import {CourseController} from "../controller/CourseController";
import {AuthController} from "../middlewares/auth";
import {ModuleController} from "../controller/ModuleController";
import {Authorization} from "../middlewares/authorization";


const router = express.Router();

const moduleController = new ModuleController();

const authController = new AuthController();

const authorization= new Authorization();


router.post("/", authController.authenticate, authorization.isAdmin, moduleController.addModule);

router.put("/:id", authController.authenticate, authorization.isAdmin,moduleController.updateModule);

router.delete("/:id",authController.authenticate, authorization.isAdmin, authController.authenticate, moduleController.deleteModule);

router.get("/:id", moduleController.findModule)

router.get("/", moduleController.findAllModules)

export default router;