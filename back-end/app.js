import express from "express";
import cors from "cors";
import User from "./models/User.js";
import Equipment from "./models/Equipment.js";
import Category from "./models/Category.js";
import Rental from "./models/rental.js";
import Reviews_user from "./models/Review_user.js";
import Reviews_equipment from "./models/Review_equipment.js";

const app = express();

app.use(express.json());
app.use(cors());
