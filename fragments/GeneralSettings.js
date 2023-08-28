import { gql } from '@apollo/client';

const BlogInfoFragment = gql`
  fragment BlogInfoFragment on GeneralSettings {
    title
    description
  }`;

export {
  BlogInfoFragment,
};