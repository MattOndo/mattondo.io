import { NextResponse } from 'next/server';
import pathToRegexp from 'path-to-regexp';
import fetch from 'node-fetch';

export async function middleware(req) {
  // Fetch redirects from the WordPress Redirection plugin
  try {
    const res = await fetch('https://wp.mattondo.io/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            redirection {
              redirects {
                source: origin
                destination: target
                regex
                code
              }
            }
          }
        `,
      }),
    });

    const responseData = await res.json();
    const redirects = responseData.data.redirection.redirects;
    // console.log(redirects);
    let targetUrl;

    // Find the matching redirect
    const matchingRedirect = redirects.find((redirect) => {
      if (redirect.regex) {
        const pattern = new RegExp(redirect.source); // Convert the source into a RegExp
        if (pattern.test(req.nextUrl.pathname)) {
          targetUrl = req.nextUrl.pathname.replace(pattern, redirect.destination) + req.nextUrl.search;
          return targetUrl;
        }
      } else if (redirect.source === req.nextUrl.pathname) {
        // const pattern = pathToRegexp(redirect.source);
        // const match = pattern.exec(req.nextUrl.pathname);
        // if (match) {
          targetUrl = redirect.destination + req.nextUrl.search;
          return targetUrl;
        // }
      }
      return null;
    });

    if (matchingRedirect) {
      return NextResponse.redirect(req.nextUrl.protocol+"//"+req.nextUrl.host + targetUrl, {
        status: matchingRedirect.code
    });
    }
  } catch (error) {
    console.error('Failed to fetch or process redirects:', error);
  }

  // Continue if no matching redirect is found or if there's an error
  return NextResponse.next();
}

export const config = {
  // No need to specify matcher here
};