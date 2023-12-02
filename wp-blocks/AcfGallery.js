import { gql } from '@apollo/client';
import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";


export default function AcfGallery(props) {
  const attributes = props.attributes;
  const images = props.acfBlockGallery.gallery.nodes;

  const thumbnailsRef = React.useRef(null);
  const captionsRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const toggleOpen = (state) => () => setOpen(state);
  const updateIndex = ({ index: current }) => setIndex(current);
  const zoomRef = React.useRef(null);


  let slides = [];

  images.forEach((image, index) => {
    slides.push({
      id: index,
      src: image.sourceUrl,
      description: image.alt,
    });
  });

  return (
    <>
      <Lightbox
        index={index}
        slides={slides}
        plugins={[Inline, Thumbnails, Captions]}
        close={() => setOpen(false)}
        on={{
          view: updateIndex,
          click: () => {
            toggleOpen(true)();
          }
        }}
        styles={{
          root: {
            "--yarl__color_backdrop": "#0b1930",
            "--yarl__container_background_color": "#0b1930",
          }
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: "cover",
        }}
        inline={{
          className: "rounded-lg",
          style: {
            cursor: "pointer",
            width: "100%",
            aspectRatio: "5 / 4",
            margin: "0 auto",
            backgroundColor: "transparent",
          },
        }}
        thumbnails={{
          ref: thumbnailsRef,
          position: "bottom",
          width: 100,
          height: "auto",
          border: "0",
          borderRadius: 4,
          padding: 0,
          gap: 8,
          showToggle: false
        }}

      />

      <Lightbox
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={slides}
        styles={{
          root: {
            "--yarl__color_backdrop": "#0b1930",
            "--yarl__container_background_color": "#0b1930",
          }
        }}
        on={{
          view: updateIndex,
        }}
        zoom={{ ref: zoomRef }}
        plugins={[Zoom]}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      />
    </>
    );
}

AcfGallery.fragments = {
  entry: gql`
    fragment AcfGalleryFragment on AcfGallery {
      anchor
      apiVersion
      acfBlockGallery {
        gallery {
          nodes {
            altText
            caption(format: RAW)
            mediaDetails {
              height
              width
            }
            sizes
            sourceUrl
          }
        }
      }
    }

  `,
  key: `AcfGalleryFragment`,
};

AcfGallery.displayName = 'AcfGallery';
// This also works
// AcfGallery.config.name = 'AcfGallery'