import { gql } from '@apollo/client';
import {Image} from '@nextui-org/react';
import className from 'classnames/bind';
const cx = className.bind();

/**
 * A page/post Featured Image component
 * @param {Props} props The props object.
 * @param {string} props.title The post/page title.
 * @param {MediaItem} props.image The post/page image.
 * @param {string|number} props.width The image width.
 * @param {string|number} props.height The image height.
 * @return {React.ReactElement} The FeaturedImage component.
 */
export default function FeaturedImage({
  className,
  imgClassName,
  image,
  width,
  height,
  ...props
}) {
  let src;
  if (image?.sourceUrl instanceof Function) {
    src = image?.sourceUrl();
  } else {
    src = image?.sourceUrl;
  }
  const { altText } = image || '';

  width = width ? width : image?.mediaDetails?.width;
  height = height ? height : image?.mediaDetails?.height;

  return src && width && height ? (
    <figure className={cx([className, 'my-0'])}>
      <Image
        isZoomed
        src={src}
        width={width}
        height={height}
        alt={altText}
        className={cx([imgClassName, 'object-cover'])}
        {...props}
      />
    </figure>
  ) : null;
}

FeaturedImage.fragments = {
  entry: gql`
    fragment FeaturedImageFragment on NodeWithFeaturedImage {
      featuredImage {
        node {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  `,
};