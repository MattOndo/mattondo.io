import { gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { closestFraction } from '../utils'
import Image from 'next/image';

const cx = className.bind();

export default function CoreCover(props) {
  const attributes = props.attributes;
  console.log(attributes);
  const cssValign = attributes.verticalAlignment ? 'self-'+attributes.verticalAlignment : null;
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
          console.error('Error loading image:', attributes.url);
        };

        // Start loading the image
        imgElement.src = attributes.url;
      } catch (error) {
        console.error('Error fetching image dimensions:', error);
      }
    }

    fetchImageDimensions();
  }, [attributes.url]);

  // Content Position
  const cssContentPosition = () => {
    switch (attributes.contentPosition) {
      case 'top left':
        // Pin to top left corner
        return 'flex items-start justify-start';
        break;
      case 'top center':
        // Span top edge
        return 'flex items-start justify-center';
        break;
      case 'top right':
        // Pin to top right corner
        return 'flex items-start justify-end';
        break;
      case 'center left':
        // Span left edge
        return 'flex items-center justify-start';
        break;
      case 'center center':
        // Fill entire parent
        return 'flex items-center justify-center';
        break;
      case 'center right':
        // Span right edge
        return 'flex items-center justify-end';
        break;
      case 'bottom left':
        // Pin to bottom left corner
        return 'flex items-end justify-start';
        break;
      case 'bottom center':
        // Span bottom edge
        return 'flex items-end justify-center';
        break;
      case 'bottom right':
        // Pin to bottom right corner
        return 'flex items-end justify-end';
        break;
    }
  }

  return (
    <div className={cx(['cover-block w-full relative', attributes.className])}>
      {attributes.customGradient && (
        <span style={{
          backgroundImage: attributes.customGradient,
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          opacity: `.${attributes.dimRatio}`,
        }}
        className='rounded-lg'></span>
      )}
      {imageDimensions && (
        <Image
          src={attributes.url}
          sizes="100vw"
          width={imageDimensions?.width}
          height={imageDimensions?.height}
          className="w-full h-auto max-h-50dvh rounded-lg object-cover"
          alt={attributes.alt}
        />
      )}
      <div className={cx(['cover-content container-fluid z-10 absolute py-4 lg:py-8 w-full h-full',cssContentPosition()])}>
        <WordPressBlocksViewer blocks={props.children}/>
      </div>
    </div>
    );
}

CoreCover.fragments = {
  entry: gql`
    fragment CoreCoverFragment on CoreCover {
      attributes {
        align
        alt
        backgroundType
        className
        contentPosition
        url
        customGradient
        dimRatio
      }
    }
  `,
  key: `CoreCoverFragment`,
};

CoreCover.displayName = 'CoreCover';
// This also works
// CoreCover.config.name = 'CoreCover'