const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Abode = mongoose.model("abode");

const AbodeType = new GraphQLObjectType({
  name: "AbodeType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    coordinates: { type: GraphQLString },
    gods: {
      type: new GraphQLList(require("./god_type")),
      resolve(parent) {
        return Abode.findById(parent.id)
          .populate("gods")
          .then((abode) => abode.gods);
      },
    },
  }),
});

module.exports = AbodeType;
