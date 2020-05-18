const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
let todoList = [ // if you assigned the todoList to a const, it cannot be deleted. .....
  {
    id: 1,
    todo: 'remake 3',
  },
  {
    id: 2,
    todo: 'try 2',
  },
  {
    id: 3,
    todo: '3???',
  },
  {
    id: 4,
    todo: '4Profit!',
  },
];
// GET /api/todos
app.get('/api/todos', (req, res) => {
  res.json(todoList)
})
// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {
  const todo =
    todoList.find((todo) => {
      return todo.id === Number.parseInt(req.params.id);
    }) || {};
  const status = Object.keys(todo).length ? 200 : 404;
  res.status(status).json(todo);
});
// POST /api/todos
app.post('/api/todos', (req, res) => {
  if(req.body.todo) {
  const maxId = todoList.reduce((max, currentTodo) => {
    if (currentTodo.id > max) {
      max = currentTodo.id;
    }
    return max;
  }, 0);
  const newTodo = {
    id: maxId + 1,
    todo: req.body.todo,
  };
  todoList.push(newTodo);
  res.json(newTodo);
  } else {
    res.status(400).json({
      error: "fix it"
    });
  };
});
// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
  if(!req.body || !req.body.todo) {
    res.status(400).json({
      error: "does not work"
    });
    return; 
  }
  let updatedToDoPair = {};
  todoList.forEach((todoPair) => {
    if (todoPair.id === Number.parseInt(req.params.id)) {
      todoPair.todo = req.body.todo;
      updatedToDoPair = todoPair;
    }
  });
  const status = Object.keys(updatedToDoPair).length ? 200 : 404;
  res.status(status).json(updatedToDoPair);
});
// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
  let toBeDel = false;
  todoList = todoList.filter((todo) => {
    if (todo.id === Number.parseInt(req.params.id)) {
      toBeDel = true;
      return false;
    }
    return true;
  })
  const status = toBeDel ? 200 : 404;
  res.status(status).json(todoList);
}); 
app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});