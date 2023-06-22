import express from "express";
import PingController from "../controllers/ping";
import SurauController from "../controllers/surau";
import RatingController from "../controllers/rating";

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

export default router;
