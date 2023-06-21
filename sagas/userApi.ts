import axios from "axios";
import { User } from "gql/__generated__/graphql";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GET_USERS, GET_USER } from "../gql/queries/users";

const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
});

const API_BASE_URL = "https://reqres.in/api/users";

// get all users.
async function getUsers(): Promise<User[]> {
  try {
    const response = await client.query({
      query: GET_USERS,
    });

    // console.log(response.data.users.data);
    const users: User[] = response.data.users.data;
    return users;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
}

// get user by id
async function getUserById(payload: any): Promise<User> {
  const response = await client.query({
    query: GET_USER,
    variables: { id: payload },
  });

  console.log(response.data.user);
  if (response.data.user.id === null) {
    throw new Error("User not found");
  }

  const user: User = response.data.user;
  return user;
}

// create user
async function createUser(payload: any): Promise<User> {
  try {
    const user = await axios.post(API_BASE_URL, payload);
    user.data.id = parseInt(user.data.id);
    return user.data;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
}

// update user
async function updateUser(payload: any): Promise<User> {
  try {
    const res = await axios.put(`${API_BASE_URL}/${payload.id}`, payload);
    // res.data == user
    return res.data;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
}

// delete user
async function deleteUser(payload: any): Promise<Boolean> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${payload}`);
    if (response.data.status === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser };
