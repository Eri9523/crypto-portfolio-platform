import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const authController = new AuthController();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/refresh", (req, res) => authController.refreshToken(req, res));
router.get('/me', authMiddleware, (req, res) => authController.getCurrentUser(req, res));
router.post('/logout', authMiddleware, (req, res) => authController.logout(req, res));

export default router;