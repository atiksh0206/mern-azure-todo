const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
    //gets the id for the todo to be changed
    const {id} = req.params;
    //finds the todo with that id
    const todo = await TodoModel.findById(id);
    //sends the todo back
    res.json(todo);
}