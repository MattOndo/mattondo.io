import { gql } from "@apollo/client";
import Link from "next/link";
import Head from "next/head";
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { 
  Header, 
  Hero,
  EntryHeader,
  Footer,
  FeaturedImage
 } from "../components";
import appConfig from '/app.config';

export default function Component(props) {
  const { data, loading, fetchMore } = useQuery(Archive.query, {
    variables: Archive.variables({ uri }),
  });

  if (loading) {
    return <></>;
  }

  const { title: siteTitle, description: siteDescription } =
    props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const { archiveType, name, posts } = props.data.nodeByUri;
  const postList = data.nodeByUri?.contentNodes?.edges.map((el) => el.node);
  const heroContent = props.data.page.pageHeader;

  return (
    <>
      <Head>
        <title>{`${archiveType}: ${name} - ${siteTitle}`}</title>
      </Head>

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

      <Main>
        <>
          <EntryHeader title={`${__typename}: ${name}`} />
          <div className="container-fluid">
            {/* <Posts posts={postList} /> */}
            {/* <LoadMore
              className="text-center"
              hasNextPage={data.nodeByUri?.contentNodes?.pageInfo.hasNextPage}
              endCursor={data.nodeByUri?.contentNodes?.pageInfo.endCursor}
              isLoading={loading}
              fetchMore={fetchMore}
            /> */}
          </div>
        </>
      </Main>

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
  ${Hero.fragments.entry}
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
    ...HeroFragment
  }
`;
