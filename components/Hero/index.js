import { gql } from "@apollo/client";
import Image from 'next/image'

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

  if (!showImage) {
    contentWrapperClasses.push('text-center');
  }

  return (
    <section {...anchor} className='container-fluid py-20 md:flex items-center'>
      <header className={`${contentWrapperClasses.join(' ')}`}>
        <h1 className='mt-0'>{headline}</h1>
        {subheadline && (
          <p className='font-mono text-teal text-xs mb-0'>{subheadline}</p>
        )}
      </header>
      {(showImage) &&
        <Image
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
