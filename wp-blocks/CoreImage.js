import { gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";


export default function CoreImage(props) {
  const attributes = props.attributes;
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const toggleOpen = (state) => () => setOpen(state);
  const updateIndex = ({ index: current }) => setIndex(current);
  const zoomRef = React.useRef(null);

  const slides = [{
    id: 0,
    src: attributes.src,
    description: attributes.alt,
  }];
  
  // Calculate image dimensions
  const [imageDimensions, setImageDimensions] = useState(null);
  useEffect(() => {
    async function fetchImageDimensions() {
      try {
        const imgElement = new window.Image();

        imgElement.onload = () => {
          setImageDimensions({
            width: imgElement.width,
            height: imgElement.height,
          });
        };

        imgElement.onerror = () => {
          console.error('Error loading image:', attributes.src);
        };

        // Start loading the image
        imgElement.src = attributes.src;
      } catch (error) {
        console.error('Error fetching image dimensions:', error);
      }
    }

    fetchImageDimensions();
  }, [attributes.src]);

  return (
    <>
    <figure>
      {imageDimensions && (
        <Image
          src={attributes.src}
          sizes="100vw"
          width={imageDimensions.width}
          height={imageDimensions.height}
          className="w-full h-auto rounded-lg cursor-pointer"
          alt={attributes.alt}
          onClick={toggleOpen(true)}
        />
      )}
      {attributes.caption && (
        <figcaption>{attributes.figcaption}</figcaption>
      )}
    </figure>

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
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
      />
    </>
    );
}

CoreImage.fragments = {
  entry: gql`
    fragment CoreImageFragment on CoreImage {
      attributes {
        src
        alt
        caption
        sizeSlug
      }
    }

  `,
  key: `CoreImageFragment`,
};

CoreImage.displayName = 'CoreImage';
// This also works
// CoreImage.config.name = 'CoreImage'