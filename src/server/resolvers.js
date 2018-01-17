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
            const newChannel = { id: nextId++, name: name };
            channels.push(newChannel);
            return newChannel;
        },
    },
};