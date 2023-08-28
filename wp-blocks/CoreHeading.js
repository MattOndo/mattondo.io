import { gql } from '@apollo/client';
import React from 'react';

export default function CoreHeading(props) {
  const attributes = props.attributes;
  const TagName = `h${attributes.level}`;
  return (
    <TagName dangerouslySetInnerHTML={{ __html: attributes.content }} className={attributes.className}></TagName>
    );
}

CoreHeading.fragments = {
  entry: gql`
    fragment CoreHeadingFragment on CoreHeading {
      attributes {
        className
        content
        textAlign
        level
      }
    }
  `,
  key: `CoreHeadingFragment`,
};

CoreHeading.displayName = 'CoreHeading';
// This also works
// CoreHeading.config.name = 'CoreHeading'