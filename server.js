const express = require('express');
const cors = require('cors');
const uuid = require('uuid-random');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// CRUD - Create Read Update Delete
// GET / ya
// POST / ya
// GET /:taskId ya
// PUT /:taskId ya
// DELETE /:taskId ya


app.get('/', (req,res) => {
  console.log(req);
  res.status(200).json(tasks)
});

app.post('/', (req, res) => {
  const task = { ...req.body, id: uuid() };
  tasks.push(task);
  res.status(200).json(task);
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const task = tasks.filter(task => task.id === id)[0];

  if(task) {
    res.status(200).json(task);
  } else {
    res.sendStatus(404);
  }
});

app.put('/:id', (req, res) => {
  const id = req.params.id;

  let changedTask;
  tasks.forEach((task, i) => {
    if(task.id === id) {
      changedTask = {
        ...task,
        ...req.body
      };
      tasks[i] = changedTask;
    }
  });

  res.status(200).json(changedTask);
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;

  tasks = tasks.filter(task => task.id !== id);

  res.sendStatus(200);
})

app.listen(3000, () => console.log('Running on port 3000'));
