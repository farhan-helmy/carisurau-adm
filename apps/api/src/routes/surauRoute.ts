import express from "express";
import { validate } from "../middleware/validate";
import { SurauSchema } from "../schema/surauSchema";
import SurauController from "../controllers/surauController";

const router = express.Router();

const surauController = new SurauController();

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

  export default router;