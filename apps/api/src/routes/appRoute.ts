import express from "express";
import AppController from "../controllers/appController";
import { validateTokenAndSchema } from "../middleware/validate";
import { AppSchema } from "../schema/appSchema";

const router = express.Router();

const appController = new AppController();

router.get("/app/developer/:id", validateTokenAndSchema(), async (req, res) => {

    const response = await appController.getApp(req.params["id"]);

    // if (response === 500) {
    //     return res.status(500).json(response).send();
    // }

    return res.status(200).send(response);
});

router.get("/app/:id", validateTokenAndSchema(), async (req, res) => {

    const response = await appController.getOneApp(req.params["id"]);

    // if (response === 500) {
    //     return res.status(500).json(response).send();
    // }

    return res.status(200).send(response);
});

router.post("/app", validateTokenAndSchema(AppSchema), async (req, res) => {
    const response = await appController.createApp(req.body);

    if (response.status === 409) {
        return res.status(409).json(response.message).send();
    }

    return res.status(201).send();
});

router.patch("/app", validateTokenAndSchema(AppSchema), async (req, res) => {
    const response = await appController.patchApp(req.body);

    if (response.status === 500) {
        return res.status(500).json(response.message).send();
    }

    return res.status(200).send();
});

router.delete("/app/:id", validateTokenAndSchema(AppSchema), async (req, res) => {

    const response = await appController.removeApp(req.params["id"]);

    if (response.status === 500) {
        return res.status(500).json(response).send();
    }

    return res.status(202).send(response);
});

export default router;
