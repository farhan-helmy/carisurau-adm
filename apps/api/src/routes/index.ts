import express from "express";
import PingController from "../controllers/pingController";
import SurauController from "../controllers/surauController";
import RatingController from "../controllers/ratingController";
import { validate } from "../middleware/validate";
import { SurauSchema } from "../schema/surauSchema";
import { sendEmail } from "../utils/sendEmail";

const router = express.Router();
const surauController = new SurauController();
const ratingController = new RatingController();

router.get("/health", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/surau", async (_req, res) => {
  const response = await surauController.getSurau();
  return res.send(response);
});

router.post("/surau", validate(SurauSchema), async (req, res) => {
  const response = await surauController.postSurau(req.body);
  return res.send(response);
});

router.get("/surau/:id", async (req, res) => {
  const response = await surauController.getOneSurau(req.params.id);
  return res.send(response);
});

router.patch("/surau/:id", async (req, res) => {
    const response = await surauController.patchSurau(req.params.id);
    return res.sendStatus(200);  
});

router.delete("/surau/:id", async (req, res) => {
    const response = await surauController.deleteSurau(req.params.id);
    return res.sendStatus(200);
});

router.delete("/rating/:id", async (req, res) => {
    const response = await ratingController.deleteRating(req.params.id);
    return res.sendStatus(200);
});

router.post("/sendmailtest", async (req, res) => {
    const response = await sendEmail()
    console.log(response)
    return res.sendStatus(200);
})

export default router;
