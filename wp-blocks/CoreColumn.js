import { gql } from '@apollo/client';
import React from 'react';
import className from 'classnames/bind';
import { WordPressBlocksViewer } from '@faustwp/blocks';

const cx = className.bind();

export default function CoreColumn(props) {
  const attributes = props.attributes;
  
  return (
    <div className={cx([attributes.className, 'w-full'])}>
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