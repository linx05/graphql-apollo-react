import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const CHANNEL_ADDED_TOPIC = 'newChannel';

const channels = [
  {
    id: 1,
    name: 'soccer',
  },
  {
    id: 2,
    name: 'baseball',
  }
];

let nextId = 3;

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, { id }) => {
      return channels.find(channel => channel.id == id);
    },
  },
  Mutation: {
    addChannel: (root, { name }) => {
      const newChannel = { id: String(nextId++), messages: [], name: name };
      channels.push(newChannel);
      pubsub.publish(CHANNEL_ADDED_TOPIC, { channelAdded: newChannel });
      return newChannel;
    },
  },
  Subscription: {
    channelAdded: { // create a channelAdded subscription resolver function.
      subscribe: () => {
        return pubsub.asyncIterator(CHANNEL_ADDED_TOPIC);
      } // subscribe to changes in a topic
    },
  },
};