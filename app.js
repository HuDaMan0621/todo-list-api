const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); //also needs json to handle json
app.use(bodyParser.urlencoded({ extended: false })); //handles the bodyParser

app.use(express.static('./public'));

const todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },

  {
    id: 2,
    todo: '2Implement a REST API',
  },

  {
    id: 3,
    todo: '3Implement a REST API',
  },

  {
    id: 4,
    todo: '4Implement a REST API',
  },
];

// GET /api/todos
app.get('/api/todos', (req, res) => {
  res.json(todoList);
})

// GET /api/todos/:id
app.get ('/api/todos/:id', (req, res) => {
  const todo = 
  todoList.find((todo) => {
    return todo.id === Number.parseInt(req.params.id);
  }) || {};
  const status = Object.keys(todo).length ? 200 : 404;
  res.status(status).json(todo);
})
// POST /api/todos
app.post('/api/todos', (req, res) => {
  if (!req.body.todo) {
    res.status(400).json({
      error: 'Please provide todo text',  //provide an error 
    });
  } else {
  //get all ids
  //find max
  //add 1 
  const maxId = todoList.reduce((max, currentTodo) => {
    if (currentTodo.id > max) {  //comparing the array to see if the next ID is greater then the previous ID 
      max = currentTodo.id;       //if it is, it will move on to the next one, if not, it will set the id to the NEW id and return the max
    }
    return max; 
  }, 0)

  // res.json(req.body);
  const newTodo = {  //create the new todo 
    id: maxId + 1,
    todo: req.body.todo,
  }
  todoList.push(newTodo); //push the new to do into the array
  res.json(newTodo); //respond with the thing we just created
  };
});

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
//   // const todo = 
//   // todoList.find((todo) => {
//   //   return todo.id === Number.parseInt(req.params.id);
//   // }) || {};
//   // const status = Object.keys(todo).length ? 200 : 404;
//   // res.status(status).json(todo);
//   const found = todoList.find((todo) => {
//     if (found) {
//       let updateTodo = req.body;
//       found.forEach(todoList => {
//         if (todoList.id === parseInt(req.params.id)){
//           todoList.id = updateTodo.id ? updateTodo.id : todoList.id;
//           todoList.todo = updateTodo.todo ? updateTodo.todo : todoList.todo;
          
//           res.json({msg: "Id updated:", id})
//         }
//         return todo.id === Number.parseInt(req.params.id);
//     });
//   } else {
//     res.status(400).json({ msg: `no id found ${req.params.id}` });
//   }
//   })
// });

  if (!req.body || !req.body.todo) {
    res.status(400).json({
      error: 'Please provide todo text',  //provide an error 
    });
    return;
  }
  let updateTodo = {};
  todoList.forEach((todo) =>{
    if (todo.id === Number.parseInt(req.params.id)) {
      todo.todo =req.body.todo;
      updateTodo = todo;
    }
  })
  const status = Object.keys(updateTodo).length ? 200 : 404;
  res.status(status).json(updateTodo);
});
// DELETE /api/todos/:id

app.listen(3001, function () {
  console.log('Todo List API is now listening on port 3001...');
});



// if (!req.body || !req.body.todo) {
//   res.status(400).json({
//     error: 'Provide todo text',
//   });
//   return;
// }
// let updatedTodo = {};
// todoList.forEach((todo) => {
//   if (todo.id === Number.parseInt(req.params.id)) {
//     todo.todo = req.body.todo;
//     updatedTodo = todo;
//   }
// });
// const status = Object.keys(updatedTodo).length ? 200 : 404;
// res.status(status).json(updatedTodo);
// });
