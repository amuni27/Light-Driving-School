import express from 'express';
import {CourseController} from "../controller/CourseController";
import {AuthController} from "../middlewares/auth";
import {ModuleController} from "../controller/ModuleController";


const router = express.Router();

const moduleController = new ModuleController();

const authController = new AuthController();


router.post("/", authController.authenticate, moduleController.addModule);

router.put("/:id", moduleController.updateModule);

router.delete("/:id", authController.authenticate, moduleController.deleteModule);

router.get("/:id", moduleController.findModule)

router.get("/", moduleController.findAllModules)

export default router;