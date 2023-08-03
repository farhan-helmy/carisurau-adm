import express from "express";
import AppController from "../controllers/appController";
import { validate } from "../middleware/validate";
import { AppSchema } from "../schema/appSchema";


const router = express.Router();

const appController = new AppController();

router.post("/app", validate(AppSchema), async (req, res) => {
    const response = await appController.createApp(req.body);

    if (response.status === 500) {
        return res.status(500).json(response.message).send();
    }

    return res.status(201).send();
});

export default router;
