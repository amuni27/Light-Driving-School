import express from 'express';
import {AuthController} from "../middlewares/auth";
import {ContentController} from "../controller/ContentController";


const router = express.Router();

const contentController = new ContentController();

const authController = new AuthController();


router.post("/", authController.authenticate, contentController.addContent);

router.put("/:id", contentController.updateContent);

router.delete("/:id", authController.authenticate, contentController.deleteContent);

router.get("/:id", contentController.findContent)

router.get("/", contentController.findAllContent)

export default router;