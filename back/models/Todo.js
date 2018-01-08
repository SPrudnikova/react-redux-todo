const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  dateStart: String,
  dateEnd: String,
  status: String,
  title: String,
  description: String,
  priority: String,
  userId: String
});

module.exports.ShortTodo = {
  title: true,
  dateStart: true,
  dateEnd: true,
  priority: true
};

module.exports.TodoModel = mongoose.model('Todo', TodoSchema);