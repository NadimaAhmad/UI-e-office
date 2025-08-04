// server.app
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let videos = [];
let idCounter = 1;

// CREATE
app.post("/videos", (req, res) => {
  const { title, url, description } = req.body;
  const newVideo = { id: idCounter++, title, url, description };
  videos.push(newVideo);
  res.status(201).json(newVideo);
});

// READ
app.get("/videos", (req, res) => {
  res.json(videos);
});

// UPDATE
app.put("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, url, description } = req.body;
  const video = videos.find((v) => v.id === id);
  if (!video) return res.status(404).json({ message: "Not Found" });

  video.title = title;
  video.url = url;
  video.description = description;
  res.json(video);
});

// DELETE
app.delete("/videos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  videos = videos.filter((v) => v.id !== id);
  res.json({ message: "Deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
