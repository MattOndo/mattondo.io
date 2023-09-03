import React from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import FeaturedImage from '../FeaturedImage';
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
      <div className={'post-list'}>
        {posts?.map((post, i) => {
          let image = post?.featuredImage?.node;

          if (!image && appConfig.archiveDisplayFeaturedImage) {
            image = {
              sourceUrl: 'https://bpmattondoio.wpengine.com/wp-content/uploads/IMG_2880-scaled.jpeg',
              mediaDetails: {
                width: 100,
                height: 100,
              }
            };
          }

          return (
            <div
              className='container-fluid'
              key={post.id ?? ''}
              id={`post-${post.id}`}
            >
              <Link
                href={post.uri}
                className="card grid grid-cols-1 md:grid-cols-[33%_auto] gap-6 items-center justify-center my-20 bg-slate p-4 border-r-2 border-teal rounded-lg"
              >
                <FeaturedImage
                  image={image}
                  width={image.mediaDetails.width}
                  height={image.mediaDetails.height}
                  imgClassName="w-full h-auto rounded-lg"
                />
                <div className='md:p-6'>
                  <h3 className='block w-full'>{post.title}</h3>
                  <div className="excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                  <p className="continue text-sm mt-5 font-mono p-2 -ml-2">Continue Reading &gt;</p>
                </div>
              </Link>
            </div>
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