const mongoose = require("mongoose");

const todolistSchema = mongoose.Schema({
  work: {
    type: String,
    maxlength: 20,
    trim: true,
  },
  isDone: Boolean,
  color: String,
});

const todosSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    todoArr: [todolistSchema],
    // createAt : {
    //   type : Date,
    //   default : moment().format("YYYY-MM-DD"),
    // }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Todos", todosSchema);
