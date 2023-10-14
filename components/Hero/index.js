import { gql } from "@apollo/client";
import Image from 'next/image'

export default function Hero({ headline, subheadline, layout, image, ...props }) {

  let src;
  if (image?.sourceUrl instanceof Function) {
    src = image?.sourceUrl();
  } else {
    src = image?.sourceUrl;
  }

  return (
    <section className="pageHero">
      {layout === "Text Only" &&
        <div className="container-fluid text-center py-20">
          <h1>{headline}</h1>
          <p className="font-mono text-teal text-xs">{subheadline}</p>
        </div>
      }
      {layout === "Image Right" && 
        <div className="container-fluid md:flex items-center gap-8 py-20">
          <div className="w-full">
            <h1>{headline}</h1>
            <p>{subheadline}</p>
          </div>
          <div className="w-full">
            <Image 
              src={src}
              alt={image.altText}
              sizes={image.sizes}
              width={image.mediaDetails.width}
              height={image.mediaDetails.height}
              className="w-full rounded-lg"
              priority={true}
            />
          </div>
        </div>
      }
    </section>
  );
}

Hero.fragments = {
  entry: gql`
    fragment HeroFragment on RootQuery {
      page(id: $databaseId, idType:DATABASE_ID, asPreview: $asPreview) {
       id
       title
       content
       pageHeader {
         headline
         subheadline
         layout
         image {
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
   }
  `,
};
