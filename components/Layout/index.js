import {
  Header,
  Footer,
  SEO
} from "../../components";
import PageTransition from '../../components/PageTransition';
import React, { forwardRef } from 'react'


export default function Layout({ children, pageProps }) {
  console.log('layout', pageProps, children)
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

        <PageTransition key={pageProps.__SEED_NODE__.id}>
          {children}
        </PageTransition>

      <Footer />
    </>
  );
}