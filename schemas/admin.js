const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema(
  {
    adminEmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
adminSchema.pre("save", async function () {
  console.log(process.env.SALTNUMBER);
  const salt = await bcrypt.genSalt(parseInt(process.env.SALTNUMBER));

  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Admin", adminSchema);
