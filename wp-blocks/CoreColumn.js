import { gql } from '@apollo/client';
import React from 'react';
import className from 'classnames/bind';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { closestFraction } from '../utils'

const cx = className.bind();

export default function CoreColumn(props) {
  const attributes = props.attributes;

  const cssValign = attributes.verticalAlignment ? 'self-'+attributes.verticalAlignment : null;
  const widthClass = attributes.width ? 'md:w-'+closestFraction(attributes.width) : 'w-full'
  
  return (
    <div className={cx([attributes.className, widthClass, cssValign])}>
      <WordPressBlocksViewer blocks={props.children}/>
    </div>
    );
}

CoreColumn.fragments = {
  entry: gql`
    fragment CoreColumnFragment on CoreColumn {
      attributes {
        className
        cssClassName
        layout
        verticalAlignment
        width
      }
    }
  `,
  key: `CoreColumnFragment`,
};

CoreColumn.displayName = 'CoreColumn';
// This also works
// CoreColumn.config.name = 'CoreColumn'