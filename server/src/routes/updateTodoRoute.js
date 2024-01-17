const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
    //gets the id for the todo to be changed
    const {id} = req.params;
    //finds the todo with that id
    const todo = await TodoModel.findById(id);
    //changes its parameters to its new changes
    todo.completed = req.body.completed;
    todo.text = req.body.text;
    //saves the chagnes and sends it back
    await todo.save();
    res.json(todo);
}