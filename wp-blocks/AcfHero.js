import { gql } from '@apollo/client';
import Hero from '@components/Hero';

export default function AcfHero(props) {
  // Get media details
  const acf_fields = props.acfBlockHero;

  // Get caption details
  const show_image = acf_fields.showImage;
  const media = show_image ? acf_fields.image.node : null;

  // Get anchor
  const anchor = props.attributes.anchor ? { id: props.attributes.anchor } : '';

  // Style options
  const imageClasses = ['w-full', 'rounded-lg'];
  const contentWrapperClasses = ['w-full'];

  return (
    <Hero 
      headline={acf_fields.headline}
      subheadline={acf_fields.subheadline}
      showImage={acf_fields.showImage}
      imagePlacement={acf_fields?.imagePlacement}
      image={acf_fields?.image?.node}
      anchor={anchor}
    />
    );
}

AcfHero.fragments = {
  entry: gql`
    fragment AcfHeroFragment on AcfHero {
      anchor
      apiVersion
      acfBlockHero {
        headline
        subheadline
        imagePlacement
        showImage
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
        align
      }
    }

  `,
  key: `AcfHeroFragment`,
};

AcfHero.displayName = 'AcfHero';