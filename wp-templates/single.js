import { gql } from "@apollo/client";
import Head from "next/head";
import {
  Footer,
  Header,
  Hero
} from "../components";
import { WordPressBlocksViewer } from '@faustwp/blocks';
import blocks from '../wp-blocks';
import { flatListToHierarchical } from '../utils'
import blockFragments from '../fragments/BlockFragments';
export default function Component(props) {

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }
  
  // Page Details
  const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const { title, content, date, author } = props.data.post;

  // Blocks
  const contentBlocks = props.data.post.editorBlocks;
  const blocks = flatListToHierarchical(contentBlocks);

  const formattedDate = new Date(date).toLocaleDateString([],{ year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Head>
        <title>{`${title} - ${siteTitle}`}</title>
      </Head>

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <Hero 
        headline={title}
        subheadline={formattedDate}
        layout="Text Only"
      />

      <main className="container-fluid prose">
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
  ${blockFragments().fragments}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      editorBlocks(flat: true) {
        __typename
        key: clientId
        parentId: parentClientId
        renderedHtml
        ${blockFragments().includes}
      }
      author {
        node {
          name
        }
      }
    }
    ...HeaderFragment
  }
`;
