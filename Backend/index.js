const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModal = require("./Models/Todo");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://ashwinshipalkar1:dLXIW2DJXAwus2tn@todoapp.l9voh.mongodb.net/?retryWrites=true&w=majority&appName=TodoApp"
  )
  .then(() => console.log("DB connected"));

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModal.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.get("/get", (req, res) => {
  TodoModal.find()
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModal.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => res.json(error));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModal.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => res.json(error));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
