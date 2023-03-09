const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const GodType = require("./god_type");
const God = mongoose.model("god");

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
  }),
});

module.exports = RootQuery;