import {
  Header,
  Footer,
} from "../../components";
import PageTransition from '../../components/PageTransition';
import React from 'react'

export default function Layout({ children, pageProps }) {
  const {
    title: siteTitle,
    description: siteDescription
  } = pageProps.__TEMPLATE_QUERY_DATA__.generalSettings;

  const menuItems = pageProps.__TEMPLATE_QUERY_DATA__.primaryMenuItems.nodes;

  return (
    <>
      {/* <SEO title={siteTitle} description={siteDescription} /> */}

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <PageTransition thekey={pageProps.__SEED_NODE__.uri}>
        {children}
      </PageTransition>

      <Footer />
    </>
  );
}