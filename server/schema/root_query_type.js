const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const GodType = require("./god_type");
const EmblemType = require("./emblem_type");
const AbodeType = require("./abode_type");
const God = mongoose.model("god");
const Emblem = mongoose.model("emblem");
const Abode = mongoose.model("abode");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    gods: {
      type: new GraphQLList(GodType),
      resolve() {
        return God.find({});
      },
    },
    god: {
      type: GodType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return God.findById(id);
      },
    },
    emblems: {
      type: new GraphQLList(EmblemType),
      resolve(parent) {
        return God.findById(parent.id)
          .populate("emblems")
          .then((god) => god.emblems);
      },
    },
    emblem: {
      type: EmblemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Emblem.findById(id);
      },
    },
    abodes: {
      type: new GraphQLList(AbodeType),
      resolve() {
        return Abode.find({});
      },
    },
    abode: {
      type: AbodeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Abode.findById(id)
          .then((abode) => abode)
          .catch((err) => null);
      },
    },
  }),
});

module.exports = RootQuery;
