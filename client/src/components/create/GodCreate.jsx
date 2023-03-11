import React, { useState } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { NEW_GOD } = Mutations;
const { FETCH_GODS } = Queries;

const GodCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e, newGod) => {
    e.preventDefault();
    newGod({
      variables: {
        name,
        type,
        description,
      },
    }).then((data) => {
      console.log(data);
      setMessage(`New god "${name} created successfully."`);
      setName("");
      setType("god");
      setDescription("");
    });
  };
  const updateCache = (cache, { data: { newGod } }) => {
    let gods;
    try {
      gods = cache.readQuery({ query: FETCH_GODS });
    } catch (err) {
      return;
    }
    if (gods) {
      cache.writeQuery({
        query: FETCH_GODS,
        data: { gods: gods.concat(newGod) },
      });
    }
  };
  return (
    <Mutation
      mutation={NEW_GOD}
      update={(cache, data) => updateCache(cache, data)}
    >
      {(newGod, { data }) => {
        return (
          <div>
            <form onSubmit={(e) => handleSubmit(e, newGod)}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="god">God</option>
                <option value="goddess">Goddess</option>
              </select>
              <input type="submit" value="Submit" />
            </form>
            <p>{message}</p>
          </div>
        );
      }}
    </Mutation>
  );
};

export default GodCreate;
