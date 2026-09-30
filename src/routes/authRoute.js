import express from "express";
import { authController } from "../controllers/index.js";
import validateRequest from "../middleware/validateRequest.js";
import { loginValidation } from "../validations/authValidations.js";

const router = express.Router();

router.post("/login", validateRequest(loginValidation), authController.authLogin);
export default router;
