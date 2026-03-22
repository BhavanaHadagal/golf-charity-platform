import express from "express";
import {
  createDraw,
  listDraws,
  updateDraw,
  deleteDraw,
  runDraw,
  simulateDraw 
} from "../controllers/drawController.js";
import adminAuth from "../middleware/adminAuth.js";

const drawRouter = express.Router();

drawRouter.post("/create", adminAuth, createDraw);
drawRouter.get("/list", listDraws);
drawRouter.post("/update", adminAuth, updateDraw);
drawRouter.post("/delete", adminAuth, deleteDraw);
drawRouter.post("/run", adminAuth, runDraw);
drawRouter.post("/simulate", adminAuth, simulateDraw);

export default drawRouter;