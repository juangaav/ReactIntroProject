const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    description: String,
    completed: Boolean
});

module.exports.Todos = mongoose.model('Todos', todosSchema);