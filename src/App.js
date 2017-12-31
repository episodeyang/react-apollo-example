import React, {Component} from 'react';

import {ApolloClient} from "apollo-client";
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider, graphql} from 'react-apollo';
import RepoList from "./components/RepoList";

const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    const token = "<put your token here>";
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

// todo: add apollo container

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <RepoList number_of={100}/>
            </ApolloProvider>
        );
    }
}

export default App;
