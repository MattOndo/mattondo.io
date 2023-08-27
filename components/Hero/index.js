import { gql } from "@apollo/client";
import Image from 'next/image'

export default function Hero({ headline, subheadline, layout, image }) {
  console.log(layout);

  let src;
  if (image?.sourceUrl instanceof Function) {
    src = image?.sourceUrl();
  } else {
    src = image?.sourceUrl;
  }

  headline = headline || title;

  return (
    <section className="pageHero container-fluid">
      {layout === "Text Only" &&
        <div className="text-center my-20">
          <h1>{headline}</h1>
          <p className="font-mono text-teal text-xs">{subheadline}</p>
        </div>
      }
      {layout === "Image Right" && 
        <div className="container-fluid md:flex items-center my-20">
          <div class="w-full">
            <h1>{headline}</h1>
            <p>{subheadline}</p>
          </div>
          <div class="w-full">
            <Image 
              src={src}
              sizes={image.sizes}
              width={image.mediaDetails.width}
              height={image.mediaDetails.height}
              className="w-full"
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
