const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
    //finds the todos
    const todos = await TodoModel.find();
    //sends the todos back
    res.json(todos);
}