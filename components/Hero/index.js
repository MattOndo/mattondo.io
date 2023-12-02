import { gql } from "@apollo/client";
import {Image} from '@nextui-org/react';

export default function Hero({ headline, subheadline, showImage, imagePlacement, image, anchor, ...props }) {

  // Style options
  const imageClasses = ['w-full', 'rounded-lg'];
  const contentWrapperClasses = ['w-full'];
  const imageWrapperClasses = ['w-full'];

  if (imagePlacement === 'left') {
    contentWrapperClasses.push('md:order-last');
    imageClasses.push('md:order-first');
  } else {
    contentWrapperClasses.push('md:order-first');
    imageClasses.push('md:order-last');
  }
  let columnClass ='';
  if (!showImage) {
    contentWrapperClasses.push('text-center');
  } else {
    columnClass = 'md:grid-cols-2';
  }

  return (
    <section {...anchor} className={`container-fluid py-20 grid gap-4 ${columnClass} items-center`}>
      <header className={`${contentWrapperClasses.join(' ')}`}>
        <h1 className='mt-0'>{headline}</h1>
        {subheadline && (
          <p className='font-mono text-teal text-xs mb-0'>{subheadline}</p>
        )}
      </header>
      {(showImage) &&
        <Image
          isZoomed
          src={image.sourceUrl}
          width={image.mediaDetails.width}
          height={image.mediaDetails.height}
          alt={image.altText}
          sizes={image.sizes}
          className={imageClasses.join(' ')}
        />
      }
    </section>
    );
}
