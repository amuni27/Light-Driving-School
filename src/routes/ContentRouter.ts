import express from 'express';
import {AuthController} from "../middlewares/auth";
import {ContentController} from "../controller/ContentController";
import {Authorization} from "../middlewares/authorization";


const router = express.Router();

const contentController = new ContentController();

const authController = new AuthController();

const authorization=new Authorization()

router.post("/", authController.authenticate, authorization.isAdmin, contentController.addContent);

router.put("/:id",authController.authenticate, authorization.isAdmin, contentController.updateContent);

router.delete("/:id",authController.authenticate, authorization.isAdmin, contentController.deleteContent);

router.get("/:id", contentController.findContent)

router.get("/", contentController.findAllContent)

export default router;