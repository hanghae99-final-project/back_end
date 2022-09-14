const mongoose = require("mongoose");
const moment = require("moment");
const dateKorea = moment().tz("Asia/Seoul").format();
const Users = require("./user");

const todolistSchema = mongoose.Schema({
  work: String,
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
    insDate: { type: String, default: dateKorea },
    // createAt : {
    //   type : Date,
    //   default : moment().format("YYYY-MM-DD"),
    // }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Todos", todosSchema);
