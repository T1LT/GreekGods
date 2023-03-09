const mongoose = require("mongoose");
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
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "god"
    }
  ]
});

GodSchema.statics.findRelatives = function (godId, type) {
  return this.findById(godId)
    .populate(`${type}`)
    .then((god) => god[type]);
};

module.exports = mongoose.model("god", GodSchema);
