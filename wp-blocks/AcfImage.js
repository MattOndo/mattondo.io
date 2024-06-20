import { gql } from '@apollo/client';
import {Image} from '@nextui-org/react';

export default function AcfImage(props) {
  // Get media details
  const media = props.acfBlockImage.image.node;
  const attributes = JSON.parse(props.attributes.data);

  // Get caption details
  const showCaption = attributes.show_caption === '1' ? true : false;
  const caption = showCaption ? (props.acfBlockImage.caption || media.caption || false) : false;

  // Get anchor
  const anchor = props.attributes.anchor ? { id: props.attributes.anchor } : '';

  // Style options
  const imageClasses = ['w-full', 'rounded-lg'];

  return (
    <>
      {(showCaption && caption !== false) &&
        <figure { ...anchor } className={`w-full p-6 border ${attributes.className}`}>
          <Image
            isZoomed
            src={media.sourceUrl}
            width={media.mediaDetails.width}
            height={media.mediaDetails.height}
            alt={media.altText}
            sizes={media.sizes}
            className={imageClasses.join(' ')}
          />
            <figcaption 
              dangerouslySetInnerHTML={{__html: caption}} 
              className="mt-6"
            />
        </figure>
      }
      {(!showCaption || !caption) &&
        <Image
          isZoomed
          { ...anchor }
          src={media.sourceUrl}
          width={media.mediaDetails.width}
          height={media.mediaDetails.height}
          alt={media.altText}
          // sizes={media.sizes}
          // className={imageClasses.join(' ')}
        />
      }
    </>
    );
}

AcfImage.fragments = {
  entry: gql`
    fragment AcfImageFragment on AcfImage {
      anchor
      apiVersion
      acfBlockImage {
        caption
        image {
          node {
            altText
            mediaDetails {
              height
              width
            }
            sizes
            sourceUrl
            caption
          }
        }
      }
      attributes {
        data
        className
        anchor
      }
    }

  `,
  key: `AcfImageFragment`,
};

AcfImage.displayName = 'AcfImage';