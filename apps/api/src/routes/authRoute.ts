import express from "express";
import AuthController from "../controllers/authController";


const router = express.Router();

const authController = new AuthController();


router.post("/auth/social", async (req, res) => {
    const response = await authController.socialAuth(req.body);
  
    if(response.status === 500) {
      return res.status(500).json(response.data).send();
    }

    return res.status(200).json(response.data).send();
  });

  export default router;
  