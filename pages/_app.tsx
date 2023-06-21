import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import store from "../store/store";
import client from "../gql/apolloClient";
import "../styles/globals.css";
import Layout from "./components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
