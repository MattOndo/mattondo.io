import { React, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { Partytown } from '@builder.io/partytown/react';

export default function Tracking() {
  const router = useRouter();

  useEffect(() => {

    const handlePageTracking = () => {
      // Initialize LogRocket
      LogRocket && LogRocket.init('czer2w/website');

      // Bind LogRocket to all analytics
      if (window.analytics) {
        const oldTrack = window.analytics.track.bind(window.analytics);
        window.analytics.track = (...args) => {
          LogRocket.track(...args);
          oldTrack(...args);
        };

        const oldIdentify = window.analytics.identify.bind(window.analytics);
        window.analytics.identify = (...args) => {
          LogRocket.identify(...args);
          oldIdentify(...args);
        };
      }

      // Track a page view on route change
      window.analytics.page();

      LogRocket.getSessionURL(function (sessionURL) {
        window.analytics.track('LogRocket', {
          sessionUrl: sessionURL
        })
      });
      
    };

    // Track a page view on initial load
    window.analytics.page();
    
    router.events.on("routeChangeComplete", handlePageTracking);
    return () => {
      router.events.off("routeChangeComplete", handlePageTracking);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <Partytown
          lib="/~partytown/"
          forward={[
            "analytics.trackSubmit",
            "analytics.trackClick",
            "analytics.trackLink",
            "analytics.trackForm",
            "analytics.pageview",
            "analytics.identify",
            "analytics.track",
            "analytics.debug",
            "analytics.page",
          ]}
          resolveUrl={function(url){
            const proxy_domains = [
              'cdn.heapanalytics.com'
            ];

            if (proxy_domains.includes(url.hostname)) {
              var proxyUrl = new URL('https://cf.mattondo.io'+url.pathname+'?host='+url.hostname);
              return proxyUrl;
            }

            return url;
          }}
        />
      </Head>

      <Script
        type="text/partytown"
        src={`https://cdn.segment.com/analytics.js/v1/${process.env.NEXT_PUBLIC_SEGMENT_KEY}/analytics.min.js`}
      />

      <Script
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){if(window.analytics.initialized)return window.analytics[e].apply(window.analytics,arguments);var i=Array.prototype.slice.call(arguments);i.unshift(e);analytics.push(i);return analytics}};for(var i=0;i<analytics.methods.length;i++){var key=analytics.methods[i];analytics[key]=analytics.factory(key)}analytics.load=function(key,i){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + ${process.env.NEXT_PUBLIC_SEGMENT_KEY} + "/analytics.min.js";t.type="text/partytown";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=i};analytics._writeKey="${process.env.NEXT_PUBLIC_SEGMENT_KEY}";;analytics.SNIPPET_VERSION="4.16.1";}}();
          window.analytics.load(${process.env.NEXT_PUBLIC_SEGMENT_KEY});`,
        }}
      />

      <Script 
        type="text/javascript"
        src="https://cdn.ingest-lr.com/LogRocket.min.js" 
      />
    </>
  );
}