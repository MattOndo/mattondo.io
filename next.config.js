const { withFaust, getWpHostname } = require('@faustwp/core');

async function fetchWordPressRedirects() {
  const resp = await fetch('https://wp.mattondo.io/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          redirection {
            redirects {
              type
              origin
              target
              regex
              code
            }
          }
        }
      `,
    }),
  });
  const { data } = await resp.json();

  console.log("raw",data.redirection.redirects);

  if(!Array.isArray(data.redirection.redirects)) {
      return [];
  }

  let redirects = data.redirection.redirects
    .filter((redirection) => redirection.type === 'url')
    .map((redirection) => ({
        source: redirection.origin,
        destination: redirection.target,
        permanent: redirection.code === 301 ? true : false
    }));

  console.log("redirects",redirects);

  return redirects;
}

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  trailingSlash: true,
  images: {
    domains: [getWpHostname()],
  },
  async redirects() {
    const wordPressRedirects = await fetchWordPressRedirects();
    return wordPressRedirects;
  },
});
