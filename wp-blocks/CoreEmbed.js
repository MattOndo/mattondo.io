import { gql } from '@apollo/client';
import React from 'react';

export default function CoreEmbed(props) {
  const attributes = props.attributes;
  let embedDetails = {};

  if (attributes.providerNameSlug === 'youtube') {
    const url = new URL(attributes.url);
    const videoId = url.searchParams.get('v');
    embedDetails = {
      title: attributes.caption,
      src: `https://www.youtube.com/embed/${videoId}`,
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    }
  }

  return (
    <div className='embed-container'>
      <iframe {...embedDetails} className='w-full aspect-video rounded-lg'  frameBorder='0' allowFullScreen></iframe>
    </div>
    );
}
CoreEmbed.fragments = {
  entry: gql`
    fragment CoreEmbedFragment on CoreEmbed {
      attributes {
        providerNameSlug
        caption
        url
      }
    }
  `,
  key: `CoreEmbedFragment`,
};

CoreEmbed.displayName = 'CoreEmbed';
// This also works
// CoreEmbed.config.name = 'CoreEmbed'