import { gql } from '@apollo/client';
import React from 'react';
import className from 'classnames/bind';
import { WordPressBlocksViewer } from '@faustwp/blocks';

const cx = className.bind();

export default function CoreColumns(props) {
  const attributes = props.attributes;
  
  // Vertical Align
  const cssValign = attributes.verticalAlignment ? 'items-'+attributes.verticalAlignment : null;

  return (
    <div className={cx([attributes.className, cssValign, `my-10 md:flex gap-8`])}>
      <WordPressBlocksViewer blocks={props.children}/>
    </div>
    );
}

CoreColumns.fragments = {
  entry: gql`
    fragment CoreColumnsFragment on CoreColumns {
      attributes {
        className
        cssClassName
        layout
        verticalAlignment
      }
    }
  `,
  key: `CoreColumnsFragment`,
};

CoreColumns.displayName = 'CoreColumns';
// This also works
// CoreColumns.config.name = 'CoreColumns'