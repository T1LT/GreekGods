import gql from "graphql-tag";

export default {
  FETCH_GODS: gql`
    query FetchGods {
      gods {
        id
        name
        description
      }
    }
  `,
};
