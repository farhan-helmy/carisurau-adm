import express from "express";
import { validateTokenAndSchema } from "../middleware/validate";
import { SurauSchema } from "../schema/surauSchema";
import SurauController from "../controllers/surauController";
import { comingSoon, validateDev } from "../middleware/validateDev";

const router = express.Router();

const surauController = new SurauController();

router.get("/surau", validateDev(), async (_req, res) => {
    const response = await surauController.getSurau();
    return res.send(response);
});

router.post("/surau", validateTokenAndSchema(SurauSchema), async (req, res) => {
    const response = await surauController.postSurau(req.body);
    return res.send(response);
});

router.get("/surau/:id", comingSoon(), async (req, res) => {
    const response = await surauController.getOneSurau(req.params.id);
    return res.send(response);
});

router.patch("/surau/:id", comingSoon(), async (req, res) => {
    const response = await surauController.patchSurau(req.params.id);
    return res.sendStatus(200);
});

router.delete("/surau/:id", comingSoon(), async (req, res) => {
    const response = await surauController.deleteSurau(req.params.id);
    return res.sendStatus(200);
});

export default router;