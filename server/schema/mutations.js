const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = graphql;
const mongoose = require("mongoose");
const God = mongoose.model("god");
const Abode = mongoose.model("abode");
const Emblem = mongoose.model("emblem");
const GodType = require("./god_type");
const AbodeType = require("./abode_type");
const EmblemType = require("./emblem_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newGod: {
      type: GodType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(_, { name, type, description }) {
        return new God({ name, type, description }).save();
      },
    },
    deleteGod: {
      type: GodType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return God.findOneAndDelete({ _id: id });
      },
    },
    updateGod: {
      type: GodType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(_, { id, name, type, description }) {
        const updateObj = {};
        updateObj.id = id;
        if (name) updateObj.name = name;
        if (type) updateObj.type = type;
        if (description) updateObj.description = description;
        return God.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, god) => {
            return god;
          }
        );
      },
    },
    updateGodAbode: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        newAbodeId: { type: GraphQLID },
      },
      resolve(_, { godId, newAbodeId }) {
        const god = God.findById(godId);
        god.abode = newAbodeId;
        return god.save();
      }
    },
    addGodRelative: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        relativeId: { type: GraphQLID },
        relationship: { type: GraphQLString },
      },
      resolve(_, { godId, relativeId, relationship }) {
        return God.addRelative(godId, relativeId, relationship);
      },
    },
    addGodEmblem: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        emblemId: { type: GraphQLID },
      },
      resolve(_, { godId, emblemId }) {
        const god = God.findById(godId);
        god.emblems.push(emblemId);
        return god.save();
      },
    },
    removeGodEmblem: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        emblemId: { type: GraphQLID },
      },
      resolve(_, { godId, emblemId }) {
        const god = God.findById(godId);
        const idx = god.emblems.findIndex((id) => id === emblemId);
        god.emblems.splice(idx, 1);
        return god.save();
      },
    },
    addGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        domain: { type: GraphQLString },
      },
      resolve(_, { godId, domain }) {
        const god = God.findById(godId);
        god.domains.push(domain);
        return god.save();
      },
    },
    removeGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        domain: { type: GraphQLString },
      },
      resolve(_, { godId, domain }) {
        const god = God.findById(godId);
        const idx = god.domains.findIndex((el) => el === domain);
        god.domains.splice(idx, 1);
        return god.save();
      }
    },
    newAbode: {
      type: AbodeType,
      args: {
        name: { type: GraphQLString },
        coordinates: { type: GraphQLString },
      },
      resolve(_, { name, coordinates }) {
        return new Abode({ name, coordinates }).save();
      },
    },
    deleteAbode: {
      type: AbodeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Abode.findOneAndDelete({ _id: id });
      },
    },
    updateAbode: {
      type: AbodeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        coordinates: { type: GraphQLString },
      },
      resolve(_, { id, name, coordinates }) {
        const updateObj = {};
        updateObj.id = id;
        if (name) updateObj.name = name;
        if (coordinates) updateObj.coordinates = coordinates;
        return Abode.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, abode) => {
            return abode;
          }
        );
      },
    },
    newEmblem: {
      type: EmblemType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(_, { name }) {
        return new Emblem({ name }).save();
      },
    },
    deleteEmblem: {
      type: EmblemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Emblem.findOneAndDelete({ _id: id });
      },
    },
    updateEmblem: {
      type: EmblemType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      resolve(_, { id, name }) {
        const updateObj = {};
        updateObj.id = id;
        if (name) updateObj.name = name;
        return Emblem.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, emblem) => {
            return emblem;
          }
        );
      },
    },
  },
});

module.exports = mutation;
