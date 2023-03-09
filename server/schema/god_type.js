const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const GodType = new GraphQLObjectType({
  name: "GodType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    domains: { type: new GraphQLList(GraphQLString) },
    parents: {
      type: new GraphQLList(GodType),
      resolve(parent) {
        return God.findRelatives(parent.id, "parents");
      },
    },
    siblings: {
      type: new GraphQLList(GodType),
      resolve(parent) {
        return God.findRelatives(parent.id, "siblings");
      },
    },
    children: {
      type: new GraphQLList(GodType),
      resolve(parent) {
        return God.findRelatives(parent.id, "children");
      }
    }
  }),
});

module.exports = GodType;
