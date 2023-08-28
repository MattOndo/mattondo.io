import { gql } from '@apollo/client';
import React from 'react';

export default function CoreList(props) {
  const attributes = props.attributes;
  const TagName = attributes.ordered ? `ol` : `ul`;
  return (
    <TagName dangerouslySetInnerHTML={{ __html: attributes.values }}></TagName>
    );
}

CoreList.fragments = {
  entry: gql`
    fragment CoreListFragment on CoreList {
      attributes {
        values
        ordered
      }
    }
  `,
  key: `CoreListFragment`,
};

CoreList.displayName = 'CoreList';
// This also works
// CoreList.config.name = 'CoreList'