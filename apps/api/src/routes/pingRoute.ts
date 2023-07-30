import express from "express";
import PingController from "../controllers/pingController";

const router = express.Router();


const pingController = new PingController();

router.get("/health", async (_req, res) => {
  const response = await pingController.getMessage();
  return res.send(response);
});


router.post("/sendmailtest", async (req, res) => {
    // const response = await sendEmail()
    // console.log(response)
    return res.sendStatus(200);
})

export default router;
