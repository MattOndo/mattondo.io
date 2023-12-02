import React from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import FeaturedImage from '../FeaturedImage';
import FormatDate from '../FormatDate'
import appConfig from '/app.config';


/**
 * Renders a list of Post items
 * @param {Props} props The props object.
 * @param {Post[]} props.posts The array of post items.
 * @param {string} props.id The unique id for this component.
 * @param {string} props.intro Message to show as an introduction text.
 * @returns {React.ReactElement} The Projects component
 */
export default function Posts({ posts }) {

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section>
      <div className={'post-list grid md:grid-cols-2 gap-8'}>
        {posts?.map((post, i) => {
          let image = post?.featuredImage?.node;

          if (!image && appConfig.archiveDisplayFeaturedImage) {
            image = {
              sourceUrl: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/uploads/IMG_2880-scaled.jpeg`,
              mediaDetails: {
                width: 100,
                height: 100,
              }
            };
          }

          return (
            <Link
              key={post.id ?? ''}
              id={`post-${post.id}`}
              href={post.uri}
              scroll={false}
              className="text-lighter-gray bg-slate rounded-xl flex flex-col h-full"
            >
              <FeaturedImage
                image={image}
                width={image.mediaDetails.width}
                height={image.mediaDetails.height}
                className="w-full grow-0"
                imgClassName="w-full h-60 object-cover object-center aspect-square"
              />
              <div className='w-full p-4 pt-6 flex justify-start flex-col grow h-full'>
                <h3 className='block w-full m-0' style={{textWrap:'balance'}}>{post.title}</h3>
                <p className='text-xs font-mono m-0 text-teal'><FormatDate date={post.date} /></p>
                <div className="excerpt grow" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                <p className="continue text-sm my-0 font-mono p-2 -ml-2 text-teal">Continue Reading &gt;</p>
              </div>
            </Link>
          );
        })}
        {posts && posts?.length < 1 && <p>No posts found.</p>}
      </div>
    </section>
  );
}

Posts.fragments = {
  entry: gql`
    ${FeaturedImage.fragments.entry}
    fragment PostsItemFragment on Post {
      id
      date
      uri
      title
      author {
        node {
          name
        }
      }
      ...FeaturedImageFragment
    }
  `,
};