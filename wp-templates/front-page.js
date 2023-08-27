import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Hero from "../components/Hero";
import EntryHeader from "../components/EntryHeader";
import Footer from "../components/Footer";
import style from "../styles/front-page.module.css";

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } =
    props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const heroContent = props.data.page.pageHeader;

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
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

      <main className="container-fluid">
        <EntryHeader title="Welcome to the Faust Scaffold Blueprint" />

        <section className={style.cardGrid}>
          <Link
            href="https://faustjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className={style.card}
          >
            <h3>Documentation →</h3>
            <p>
              Learn more about Faust.js through guides and reference
              documentation.
            </p>
          </Link>

          <Link
            href="https://my.wpengine.com/atlas#/create/blueprint"
            target="_blank"
            rel="noopener noreferrer"
            className={style.card}
          >
            <h3>Blueprints →</h3>
            <p>Explore production ready Faust.js starter projects.</p>
          </Link>

          <Link
            href="https://wpengine.com/atlas"
            target="_blank"
            rel="noopener noreferrer"
            className={style.card}
          >
            <h3>Deploy →</h3>
            <p>
              Deploy your Faust.js app to Atlas along with your WordPress
              instance.
            </p>
          </Link>

          <Link
            href="https://github.com/wpengine/faustjs"
            target="_blank"
            rel="noopener noreferrer"
            className={style.card}
          >
            <h3>Contribute →</h3>
            <p>Visit us on GitHub to explore how you can contribute!</p>
          </Link>
        </section>
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
  query GetHomePage($databaseId: ID!, $asPreview: Boolean = false) {
    ...HeaderFragment
    ...HeroFragment
  }
`;
