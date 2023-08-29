import { gql } from '@apollo/client';
import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import className from 'classnames/bind';
import './CoreGallery.css';
const cx = className.bind();

import useEmblaCarousel from 'embla-carousel-react'

export default function CoreGallery(props) {
  const attributes = props.attributes;
  const images = props.children;

  useEmblaCarousel.globalOptions = { loop: true }
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center' 
  })
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    console.log("here",emblaApi);
    
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])


  // console.log(images);

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__viewport">
        <div className="embla__container flex">
        {images.map(({ key, attributes }, index) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0" key={index} data-key={index}>
            <img 
              src={attributes.src} 
              width={0}
              height={0}
              className='w-full' />
          </div>
        ))}
        </div>
      </div>
      <div className="embla__buttons">
        <button
          onClick={onPrevButtonClick} 
          disabled={prevBtnDisabled}
          className="embla__button embla__button--prev"
          type="button"
        >
          <svg className="embla__button__svg" viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
            />
          </svg>
        </button>
        <button
          onClick={onNextButtonClick} 
          disabled={nextBtnDisabled}
          className="embla__button embla__button--next"
          type="button"
        >
          <svg className="embla__button__svg" viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
            />
          </svg>
        </button>
      </div>
    </div>
    );
}

CoreGallery.fragments = {
  entry: gql`
    fragment CoreGalleryFragment on CoreGallery {
      attributes {
        images
        columns
        align
      }
    }

  `,
  key: `CoreGalleryFragment`,
};

CoreGallery.displayName = 'CoreGallery';
// This also works
// CoreGallery.config.name = 'CoreGallery'