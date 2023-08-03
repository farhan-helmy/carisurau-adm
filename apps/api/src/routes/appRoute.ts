import express from "express";
import AppController from "../controllers/appController";


const router = express.Router();

const appController = new AppController();


router.post("/app", async (req, res) => {
    const response = await appController.createApp();
    console.log(response)
  });

  export default router;
  