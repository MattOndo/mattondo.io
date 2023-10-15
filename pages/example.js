import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getNextStaticProps } from "@faustwp/core";

/**
 * Next.js file based page example with Faust helpers.
 */
export default function Page() {
  const { data } = useQuery(Page.query);

  const { title: siteTitle, description: siteDescription } =
    data.generalSettings;
  const menuItems = data.primaryMenuItems.nodes;

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <main className="container-fluid">
        <p>Next.js pages are still supported!</p>
      </main>
    </>
  );
}

Page.query = gql`
  ${Header.fragments.entry}
  query GetHomePage {
    ...HeaderFragment
  }
`;

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {
    Page,
  });
}
