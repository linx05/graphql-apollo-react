import React from 'react';
import { render } from 'react-dom';
import '../style/app.scss';
import ChannelList from './components/ChannelList/ChannelList';
import CreateChannel from './components/CreateChannel/CreateChannel';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const networkInterface = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const client = new ApolloClient({
   link: networkInterface,
   cache: new InMemoryCache(),
});

render(
    <ApolloProvider client={client}>
      <div className="App">
        <h3 className="center">React , GraphQL , Apollo</h3>
        <div className="row">
            <div className="col-lg-4 col-lg-offset-4">
              <CreateChannel />
              <br/>
              <ChannelList />
            </div>
        </div>
      </div>
    </ApolloProvider>,
    document.querySelector('#app')
);