import express from "express";
import messageRouter from "./message.router";

const mainRouter = express.Router();

mainRouter.use("/message", messageRouter);

export default mainRouter;