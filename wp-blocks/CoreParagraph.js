import { gql } from '@apollo/client';
import React from 'react';

export default function CoreParagraph(props) {
  const attributes = props.attributes;
  return (
    <p
      dangerouslySetInnerHTML={{ __html: attributes.content }}></p>
    );
}

CoreParagraph.fragments = {
  entry: gql`
    fragment CoreParagraphFragment on CoreParagraph {
      attributes {
        content
      }
    }
  `,
  key: `CoreParagraphFragment`,
};

CoreParagraph.displayName = 'CoreParagraph';
// This also works
// CoreParagraph.config.name = 'CoreParagraph'