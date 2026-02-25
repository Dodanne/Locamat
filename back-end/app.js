import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes/index.routes.js";
import { fileURLToPath } from "url";
import { postWebHook } from "./controllers/paiement.controller.js";

const app = express();
app.post("/webhook", express.raw({ type: "application/json" }), postWebHook);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "public/images")));

export default app;
