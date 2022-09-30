const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const dateKorea = moment().tz("Asia/Seoul").format();

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
    insDate: { type: String, default: dateKorea },
  },
  { timestamps: true }
);
adminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALTNUMBER));

  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Admin", adminSchema);
