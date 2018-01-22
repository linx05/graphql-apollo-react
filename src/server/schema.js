import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
    type Channel {
        id: ID! # "!" denotes a required field
        name: String
        messages: [Message]!
    }

    type Message {
        id: ID!
        text: String
    }
    # This type specifies the entry points into our API
    type Query {
        channels: [Channel]
        channel(id: ID!): Channel
    }

    type Mutation {
        addChannel(name: String!): Channel
    }
    
    # The subscription root type, specifying what we can subscribe to
    type Subscription {
        channelAdded: Channel    # subscription operation.
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };