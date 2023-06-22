import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query users($options: PageQueryOptions) {
    users(options: $options) {
      data {
        id
        name
        username
        email
      }
    }
  }
`;

export const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      email
      address {
        street
        suite
        city
        zipcode
      }
      phone
      website
      company {
        name
      }
    }
  }
`;
