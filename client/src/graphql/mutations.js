import gql from "graphql-tag";

export default {
  DELETE_GOD: gql`
    mutation DeleteGod($id: ID) {
      deleteGod(id: $id) {
        id
      }
    }
  `,
};
