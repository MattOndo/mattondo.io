import { gql } from '@apollo/client';
import React from 'react';
import className from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const cx = className.bind();


export default function CoreGallery(props) {
  const attributes = props.attributes;
  const images = props.children;

  return (
    <Carousel 
      showArrows={true} 
      showDots={false} 
      emulateTouch={true} 
      infiniteLoop={true} 
      showStatus={false} 
      showIndicators={false} 
      autoPlay={true} 
      interval={4000}
      transitionTime={600}
      useKeyboardArrows={true}
      >
        {images.map(({ key, attributes }) => (
          <figure key={key}>
            <img 
              id={key}
              src={attributes.src} 
              width={0}
              height={0}
              className='w-full' />
              <figcaption>{attributes.alt}</figcaption>
          </figure>
        ))}
    </Carousel>
    );
}

CoreGallery.fragments = {
  entry: gql`
    fragment CoreGalleryFragment on CoreGallery {
      attributes {
        images
        columns
        align
      }
    }

  `,
  key: `CoreGalleryFragment`,
};

CoreGallery.displayName = 'CoreGallery';
// This also works
// CoreGallery.config.name = 'CoreGallery'