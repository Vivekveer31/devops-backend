import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const filePath = "./tasks.json";

// Read tasks
app.get("/tasks", (req, res) => {
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];
  res.json(data);
});

// Add task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];

  const newTask = { id: Date.now(), title };
  data.push(newTask);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(201).json(newTask);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];

  const filtered = data.filter((t) => t.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));

  res.json({ message: "Task deleted" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(5000, () => console.log("🚀 Server running on port 5000"));
}

export default app;