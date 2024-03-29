import "../faust.config";
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import Tracking from '../components/Tracking';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import Layout from "../components/Layout";
import blocks from '../wp-blocks';
import "../styles/globals.css";
import '@faustwp/core/dist/css/toolbar.css';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  return (
    <>
      <NextUIProvider>
        <FaustProvider pageProps={pageProps}>
          <WordPressBlocksProvider
            config={{
              blocks,
            }}>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} key={router.asPath} />
            </Layout>
          </WordPressBlocksProvider>
        </FaustProvider>
      </NextUIProvider>

      <Tracking />
    </>
  );
}
