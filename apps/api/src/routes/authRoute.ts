import express from "express";
import AuthController from "../controllers/authController";


const router = express.Router();

const authController = new AuthController();


router.post("/auth/social", async (req, res) => {
    console.log(req.body)
    const response = await authController.socialAuth(req.body);
  
    console.log(response)
  });

  export default router;
  