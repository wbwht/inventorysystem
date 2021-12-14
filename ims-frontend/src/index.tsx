import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from './contexts/auth0-context';
import { BrowserRouter } from 'react-router-dom';

import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql'
  });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Auth0Provider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Auth0Provider>
    </ApolloProvider>,
    document.getElementById('root')
);