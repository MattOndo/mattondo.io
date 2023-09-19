import { gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AcfTestimonial(props) {
  console.log(props);
  
  const blockData = JSON.parse(props.attributes.data);
  console.log(blockData);

  return (
    <div>Testimonial Block Here</div>
    );
}

AcfTestimonial.fragments = {
  entry: gql`
    fragment AcfTestimonialFragment on AcfTestimonial {
      name
      attributes {
        data
      }
      blockTestimonial {
        fieldGroupName
        author
        quote
        role
        image {
          altText
          mediaDetails {
            height
            width
          }
          sourceUrl
        }
      }
    }

  `,
  key: `AcfTestimonialFragment`,
};

AcfTestimonial.displayName = 'AcfTestimonial';
// This also works
// AcfTestimonial.config.name = 'AcfTestimonial'