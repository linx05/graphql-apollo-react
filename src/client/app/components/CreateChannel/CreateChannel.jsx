import React from 'react';
import { func } from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { channelsListQuery } from '../ChannelList/ChannelList';

const CreateChannel = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({
        variables: { name: evt.target.value },
        // refetchQueries: [{ query: channelsListQuery }] // We could do this if we want to fetch as soon as we send the mutation
      })
      .then(res => {
        evt.target.value = '';
      });
    }
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="New channel"
      onKeyUp={handleKeyUp}
    />
  );
};

CreateChannel.propTypes = {
  mutate: func.isRequired,
};

const CreateChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

export default graphql(CreateChannelMutation)(CreateChannel);
