import "../faust.config";
import { React } from "react";
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

        <FaustProvider pageProps={pageProps} key={pageProps.__SEED_NODE__.id}>
          <WordPressBlocksProvider
            config={{
              blocks,
            }}>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} key={router.asPath} />
            </Layout>
          </WordPressBlocksProvider>
        </FaustProvider>

      <Tracking />
    </>
  );
}
