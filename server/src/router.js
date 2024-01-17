const express = require('express');
const isLoggedIn = require('./middleware/isLoggedIn');

const createTodoRoute = require('./routes/createTodoRoute');
const readTodosRoute = require('./routes/readTodosRoute');
const readTodoRoute = require('./routes/readTodoRoute');
const updateTodoRoute = require('./routes/updateTodoRoute');
const deleteTodoRoute = require('./routes/deleteTodoRoute');
const router = express.Router();



router.post('/login', require('./routes/loginRoute'));
//CRUD
//CREATE
router.post('/todos', isLoggedIn, createTodoRoute);
//READ ToDO by id
router.get('/todos/:id', isLoggedIn, readTodoRoute);
//READ all ToDos
router.get('/todos', isLoggedIn, readTodosRoute);
//UPDATE
router.put('/todos/:id', isLoggedIn, updateTodoRoute);
//DELETE
router.delete('/todos/:id', isLoggedIn, deleteTodoRoute);
//allows us to load into other files
module.exports = router;