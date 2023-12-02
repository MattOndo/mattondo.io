import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import { getNextStaticProps } from "@faustwp/core";
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Hero,
  Footer,
  SEO
} from "../components";

export default function Page(props) {
  const { data } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const { title, content } = props.data.page;
  const heroContent = props.data.page.pageHeader;

  return (
    <>
      <SEO
        title="Contact Matt"
        description={siteDescription}
        robots="noindex,nofollow"
      />

      <Hero 
        headline="Contact Matt"
        subheadline="Submit the form below to get in touch."
        showImage={false}
      />

      <div className="container-fluid">
        <ContactForm />
      </div>
    </>
  );
}

Page.variables = () => {
  return {
    databaseId: 199
  };
};

Page.query = gql`
  ${Header.fragments.entry}
  ${BlogInfoFragment}
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
      }
      author {
        node {
          name
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    ...HeaderFragment
  }
`;

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {
    Page,
    props: {},
  });
}
