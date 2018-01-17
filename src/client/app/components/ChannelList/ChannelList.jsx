import React from 'react';
import { object, boolean, shape, array } from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const ChannelsList = ({ data: {loading, error, channels }}) => {
    if (loading) {
      return <p>Fetching Data...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return <ul className="list-group">
      { channels.map( channel => <li className="list-group-item" key={channel.id}>{channel.name}</li> ) }
    </ul>;
  };

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

ChannelsList.propTypes = {
  data: shape({ loading: boolean, error: object, channels: array }),
};

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);
export default ChannelsListWithData;