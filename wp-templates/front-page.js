import { gql } from "@apollo/client";
import Head from "next/head";
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

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <Hero 
        headline={heroContent.headline || title}
        subheadline={heroContent.subheadline}
        layout={heroContent.layout}
        image={heroContent.image}
      />

      <main className="container-fluid">
        <WordPressBlocksViewer blocks={blocks}/>
      </main>

      <Footer />
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
  ${Hero.fragments.entry}
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
      author {
        node {
          name
        }
      }
    }
    ...HeaderFragment
    ...HeroFragment
  }
`;
