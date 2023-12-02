import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import {
  Header,
  Hero,
  Footer,
  SEO
} from "../components";
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '../utils'
import blocks from '../wp-blocks';
import getFragmentDataFromBlocks from "../utils/getFragmentDataFromBlocks";

export default function Component(props) {
  // Page Details
  const { title: siteTitle, description: siteDescription } =
    props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const heroContent = props.data.page.pageHeader;


  // Blocks
  const contentBlocks = props.data.page.editorBlocks;
  const blocks = flatListToHierarchical(contentBlocks);

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <main>
        <WordPressBlocksViewer blocks={blocks}/>
      </main>
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${Header.fragments.entry}
  ${getFragmentDataFromBlocks(blocks).entries}
  query GetHomePage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      editorBlocks(flat: true) {
        __typename
        key: clientId
        parentId: parentClientId
        renderedHtml
        ${getFragmentDataFromBlocks(blocks).keys}
      }
    }
    ...HeaderFragment
  }
`;
