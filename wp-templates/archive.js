import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import Head from "next/head";
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { 
  Header, 
  Hero,
  Footer,
  FeaturedImage,
  Posts,
  SEO
 } from "../components";
import appConfig from '/app.config';

export default function Component(props) {
  const { __typename, name, posts, uri } = props.data.nodeByUri;

  const { data, loading, fetchMore } = useQuery(Component.query, {
    variables: Component.variables({ uri }),
  });

  if (loading) {
    return <></>;
  }

  const { title: siteTitle, description: siteDescription } =
    props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const postList = data.nodeByUri?.contentNodes?.edges.map((el) => el.node);

  return (
    <>
      <SEO
        title="Matt's Archive"
        description={siteDescription}
      />

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <Hero 
        headline="Archive"
        subheadline="Welcome to my brain"
        layout="Text Only"
      />

      <main>
        <div className="container-fluid">
          <Posts posts={postList} />
          {/* <LoadMore
            className="text-center"
            hasNextPage={data.nodeByUri?.contentNodes?.pageInfo.hasNextPage}
            endCursor={data.nodeByUri?.contentNodes?.pageInfo.endCursor}
            isLoading={loading}
            fetchMore={fetchMore}
          /> */}
        </div>
      </main>

      <Footer />
    </>
  );
}

Component.variables = ({ uri }) => {
  return {
    uri,
    first: appConfig.postsPerPage,
    after: '',
  };
};

Component.query = gql`
  ${Header.fragments.entry}
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetCategoryPage(
    $uri: String!
    $first: Int!
    $after: String!
  ) {
    nodeByUri(uri: $uri) {
      __typename
      id
      uri
      ... on ContentType {
        name
        description
        label
        contentNodes(first: $first, after: $after) {
          edges {
            node {
              id
              ... on NodeWithTitle {
                title
              }
              ... on NodeWithContentEditor {
                content
              }
              ... on NodeWithExcerpt {
                excerpt
              }
              date
              uri
              ...FeaturedImageFragment
              ... on NodeWithAuthor {
                author {
                  node {
                    name
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
      ... on TermNode {
        name
        description
        ... on Category {
          contentNodes(first: $first, after: $after) {
            edges {
              node {
                id
                ... on NodeWithTitle {
                  title
                }
                ... on NodeWithContentEditor {
                  content
                }
                date
                uri
                ...FeaturedImageFragment
                ... on NodeWithAuthor {
                  author {
                    node {
                      name
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
        ... on Tag {
          contentNodes(first: $first, after: $after) {
            edges {
              node {
                id
                ... on NodeWithTitle {
                  title
                }
                ... on NodeWithContentEditor {
                  content
                }
                date
                uri
                ...FeaturedImageFragment
                ... on NodeWithAuthor {
                  author {
                    node {
                      name
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    ...HeaderFragment
  }
`;
