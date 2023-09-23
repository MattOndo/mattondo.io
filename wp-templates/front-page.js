import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import {
  Header,
  Hero,
  Footer,
  SEO
} from "../components";
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '../utils'
import blocks from '../wp-blocks';
import getFragmentDataFromBlocks from "../utils/getFragmentDataFromBlocks";

export default function Component(props) {
  // Page Details
  const { title: siteTitle, description: siteDescription } =
    props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const heroContent = props.data.page.pageHeader;

  const pageContent = {
    section1: {
      headline: props.data.page.homepageContent.hmsec1Headline,
      content: props.data.page.homepageContent.hmsec1Content,
      image: props.data.page.homepageContent.hmsec1Image,
    },
    section2: {
      headline: props.data.page.homepageContent.hmsec2Headline,
      content: props.data.page.homepageContent.hmsec2Content,
      image: props.data.page.homepageContent.hmsec2Image,
    },
    section3: {
      headline: props.data.page.homepageContent.hmsec3Headline,
      content: props.data.page.homepageContent.hmsec3Content,
      image: props.data.page.homepageContent.hmsec3Image,
    }
  }


  // Blocks
  const contentBlocks = props.data.page.editorBlocks;
  const blocks = flatListToHierarchical(contentBlocks);

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />

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
        <section className="flex flex-col md:flex-row-reverse items-center gap-8 my-20">
          <div className="w-full">
            <h2>{pageContent.section1.headline}</h2>
            <p>{pageContent.section1.content}</p>
          </div>
          <div className="w-full">
            <Image 
              src={pageContent.section1.image.sourceUrl}
              alt={pageContent.section1.image.altText}
              sizes={pageContent.section1.image.sizes}
              width={pageContent.section1.image.mediaDetails.width}
              height={pageContent.section1.image.mediaDetails.height}
              className="w-full rounded-lg"
              priority={true}
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center gap-8 my-20">
          <div className="w-full">
            <h2>{pageContent.section2.headline}</h2>
            <p>{pageContent.section2.content}</p>
          </div>
          <div className="w-full">
            <Image 
              src={pageContent.section2.image.sourceUrl}
              alt={pageContent.section2.image.altText}
              sizes={pageContent.section2.image.sizes}
              width={pageContent.section2.image.mediaDetails.width}
              height={pageContent.section2.image.mediaDetails.height}
              className="w-full rounded-lg"
              priority={true}
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse items-center gap-8 my-20">
          <div className="w-full">
            <h2>{pageContent.section3.headline}</h2>
            <p>{pageContent.section3.content}</p>
          </div>
          <div className="w-full">
            <Image 
              src={pageContent.section3.image.sourceUrl}
              alt={pageContent.section3.image.altText}
              sizes={pageContent.section3.image.sizes}
              width={pageContent.section3.image.mediaDetails.width}
              height={pageContent.section3.image.mediaDetails.height}
              className="w-full rounded-lg"
              priority={true}
            />
          </div>
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
  ${getFragmentDataFromBlocks(blocks).entries}
  query GetHomePage($databaseId: ID!, $asPreview: Boolean = false) {
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
      homepageContent {
        hmsec1Headline
        hmsec1Content
        hmsec1Image {
          uri
          altText
          srcSet
          sourceUrl
          sizes
          mediaDetails {
            width
            height
          }
        }
        hmsec2Headline
        hmsec2Content
        hmsec2Image {
          uri
          altText
          srcSet
          sourceUrl
          sizes
          mediaDetails {
            width
            height
          }
        }
        hmsec3Headline
        hmsec3Content
        hmsec3Image {
          uri
          altText
          srcSet
          sourceUrl
          sizes
          mediaDetails {
            width
            height
          }
        }
      }
    }
    ...HeaderFragment
    ...HeroFragment
  }
`;
