import { gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CoreImage(props) {
  const attributes = props.attributes;
  
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
    <figure>
      {imageDimensions && (
        <Image
          src={attributes.src}
          sizes="100vw"
          width={imageDimensions.width}
          height={imageDimensions.height}
          className="w-full h-auto rounded-lg"
          alt={attributes.alt}
        />
      )}
      {attributes.caption && (
        <figcaption>{attributes.figcaption}</figcaption>
      )}
    </figure>
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