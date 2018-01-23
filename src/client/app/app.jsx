import React from 'react';
import { render } from 'react-dom';
import '../style/app.scss';
import ChannelList from './components/ChannelList/ChannelList';
import CreateChannel from './components/CreateChannel/CreateChannel';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  options: { reconnect: true }
});

const wsEndpoint = 'ws://localhost:8000/subscriptions';

let wsLink = new WebSocketLink({
  uri: wsEndpoint,
  options: { reconnect: true }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
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