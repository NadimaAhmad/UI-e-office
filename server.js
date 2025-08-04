// server.app
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let products = []; // Simpan data sementara di memory
let idCounter = 1;

// CREATE
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: idCounter++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// READ
app.get("/products", (req, res) => {
  res.json(products);
});

// UPDATE
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Not Found" });

  product.name = name;
  product.price = price;
  res.json(product);
});

// DELETE
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ message: "Deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
