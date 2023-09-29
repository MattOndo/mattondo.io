import { gql } from '@apollo/client';
import { React } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import php from 'highlight.js/lib/languages/php';
import bash from 'highlight.js/lib/languages/bash';
import graphql from 'highlight.js/lib/languages/graphql';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/github-dark-dimmed.css';

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('php', php)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('graphql', graphql)
hljs.registerLanguage('json', json)

export default function AcfCode(props) {
  const attributes = props.attributes;
  const parsedData = JSON.parse(attributes.data);
  const stringifiedData = JSON.stringify(parsedData, null, 2);
  const data = JSON.parse(stringifiedData);
  const code = data.code;
  let language = data.language;
  let label = language;

  if (language === 'html') {
    language = 'xml';
  } 
  if (language === 'command_line') {
    language = 'bash';
    label = 'terminal';
  }
  
  const highlightedCode = hljs.highlight(code, { language: language }).value

  return (
    <pre className='theme-github-dark-dimmed shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full rounded-xl my-4 shadow-md'>
      <div className='absolute top-0 left-0 w-full py-3 px-4 flex justify-between items-center z-10'>
        <small className='rounded-md opacity-50 p-0 pointer-events-none text-xs'><span className='hidden'>Language: </span>{label}</small>
        <button 
          className='appearance-none p-0 text-xs hover:text-teal active:transform active:scale-95 transition-all' 
          role="button" 
          onClick={() => navigator.clipboard.writeText(`${code}`)}
        >
          Copy
        </button>
      </div>
      <span className='hljs mb-0 p-4 pt-9 block min-h-full relative overflow-auto'>
        <code dangerouslySetInnerHTML={{__html: highlightedCode}}></code>
      </span>
    </pre>
    );
}

AcfCode.fragments = {
  entry: gql`
    fragment AcfCodeFragment on AcfCode {
      attributes {
        data
      }
    }
  `,
  key: `AcfCodeFragment`,
};

AcfCode.displayName = 'AcfCode';
// This also works
// AcfCode.config.name = 'AcfCode'