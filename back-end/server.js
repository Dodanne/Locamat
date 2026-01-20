import express from "express";
import db from "./db/connection.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/equipment", async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM equipment");
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
app.get("/equipment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [data] = await db.query(
      `SELECT e.*,u.id as id, u.user_type as user_user_type, u.city as user_city, u.rating_avg as user_rating_avg, u.rating_count as user_rating_count, u.first_name as user_first_name, u.last_name as user_last_name, u.photo as user_photo 
      FROM equipment e 
      JOIN users u 
      ON e.owner_id =u.id 
      WHERE e.id=${id}`,
    );
    res.json(data[0]);
  } catch (err) {
    console.error(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM users");
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [data] = await db.query(`SELECT * FROM users WHERE id=${id}`);
    res.json(data[0]);
  } catch (err) {
    console.error(err);
  }
});
app.get("/user/:id/equipment", async (req, res) => {
  try {
    const id = req.params.id;
    const [data] = await db.query(
      `SELECT * FROM equipment WHERE owner_id=${id}`,
    );
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
app.get("/category", async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM category");
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});
app.get("/category/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [data] = await db.query(`SELECT * FROM category WHERE id=${id}`);
    res.json(data[0]);
  } catch (err) {
    console.error(err);
  }
});
app.get("/rent", async (req, res) => {
  try {
    const [data] = await db.query(`SELECT * FROM rental 
JOIN users 
ON rental.renter_id=users.id
JOIN equipment 
ON rental.equipment_id=equipment.id`);
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});

app.get("/rental/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [data] = await db.query(
      `SELECT * FROM rental JOIN equipment ON rental.equipment_id=equipment.id JOIN user  WHERE id=${id}`,
    );
    res.json(data[0]);
  } catch (err) {
    console.error(err);
  }
});

app.post("/new-equipment", async (req, res) => {
  try {
    const { title, description, category_id, photo, price, caution } = req.body;
    const [data] = await db.query(
      `INSERT INTO equipment (title, description, category_id, photo, price, caution, owner_id) VALUES ('${title}', '${description}', ${category_id}, '${photo}', ${price}, ${caution}, 2)`,
    );
    res.json(data[0]);
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("Back-end lancé");
});
