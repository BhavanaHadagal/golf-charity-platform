import express from "express";
import { getAdminReports } from "../controllers/reportController.js";
import adminAuth from "../middleware/adminAuth.js";

const reportRouter = express.Router();

reportRouter.get("/admin", adminAuth, getAdminReports);

export default reportRouter;