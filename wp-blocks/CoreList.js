import { gql } from '@apollo/client';
import React from 'react';

export default function CoreList(props) {
  
  return (
    <div dangerouslySetInnerHTML={{ __html: props.renderedHtml }}></div>
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