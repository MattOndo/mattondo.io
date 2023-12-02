import { gql } from "@apollo/client";
import {
  Header,
  Hero,
  Footer,
  SEO
} from "../components";
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical, pageTitle } from '../utils'
import blocks from '../wp-blocks';
import getFragmentDataFromBlocks from "../utils/getFragmentDataFromBlocks";

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  // Blocks
  const contentBlocks = props.data.page.editorBlocks;
  const blocks = flatListToHierarchical(contentBlocks);

  const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const { title, content } = props.data.page;

  return (
    <>
      <SEO title={`Matt's ${title}`} />

      <main className="container-fluid">
        <WordPressBlocksViewer blocks={blocks}/>
      </main>
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview
  };
};

Component.query = gql`
  ${Header.fragments.entry}
  ${getFragmentDataFromBlocks(blocks).entries}
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
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
  }
`;
