import "../faust.config";
import { React } from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import Tracking from '../components/Tracking';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import blocks from '../wp-blocks';
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <FaustProvider pageProps={pageProps}>
        <WordPressBlocksProvider
          config={{
            blocks,
          }}>
          <Component {...pageProps} key={router.asPath} />
        </WordPressBlocksProvider>
      </FaustProvider>

      <Tracking />
    </>
  );
}
