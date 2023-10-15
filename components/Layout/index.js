import { useQuery, gql } from "@apollo/client";
import { BlogInfoFragment } from '../../fragments/GeneralSettings';
import {
  Header,
  Footer,
} from "../../components";
import PageTransition from '../../components/PageTransition';
import React from 'react'
import { usePathname } from "next/navigation";

export default function Layout({ children, pageProps }) {
  const { data } = useQuery(Layout.query);
  const pathname = usePathname();
  const {
    title: siteTitle,
    description: siteDescription,
  } = data?.generalSettings ?? {};
  const menuItems = data?.primaryMenuItems?.nodes ?? [];

  return (
    <>
      {/* <SEO title={siteTitle} description={siteDescription} /> */}

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <PageTransition thekey={pathname}>
        {children}
      </PageTransition>

      <Footer />
    </>
  );
}

Layout.query = gql`
  ${Header.fragments.entry}
  ${BlogInfoFragment}
  query GetPage {
    generalSettings {
      ...BlogInfoFragment
    }
    ...HeaderFragment
  }
`;

