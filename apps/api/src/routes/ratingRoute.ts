import express from "express";

import RatingController from "../controllers/ratingController";
const router = express.Router();
const ratingController = new RatingController()

router.delete("/rating/:id", async (req, res) => {
    await ratingController.deleteRating(req.params.id);
    return res.sendStatus(200);
});

export default router;