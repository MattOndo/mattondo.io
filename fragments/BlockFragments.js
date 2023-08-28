import { gql } from "@apollo/client";
import Blocks from "../wp-blocks";

export default function blockFragments() {
  let fragments = [];
  let includes = [];
  const blockNames = Object.keys(Blocks);
  blockNames.forEach((key,index) => {
    includes.push(`... ${key}Fragment
      `);
    fragments.push(`${Blocks[key].fragments.entry.loc.source.body}`
    );
  });
  const fragString = fragments.join('');
  const incString = includes.join('');
  return {
    fragments: fragString,
    includes: incString
  };
};