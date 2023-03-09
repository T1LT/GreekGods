const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const GodSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  domains: [
    {
      type: String,
    },
  ],
  abode: {
    type: Schema.Types.ObjectId,
    ref: "abode",
  },
  emblems: [
    {
      type: Schema.Types.ObjectId,
      ref: "emblem",
    },
  ],
  parents: [
    {
      type: Schema.Types.ObjectId,
      ref: "god",
    },
  ],
  siblings: [
    {
      type: Schema.Types.ObjectId,
      ref: "god",
    },
  ],
});

module.exports = mongoose.model("god", GodSchema);
