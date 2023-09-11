const express = require('express');
const https = require('https');
const fs = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const sslKeyPath = './mattondo.local-key.pem'; // Replace with your key path
const sslCertPath =  './mattondo.local.pem';   // Replace with your certificate path

const httpsOptions = {
  key: fs.readFileSync(sslKeyPath),
  cert: fs.readFileSync(sslCertPath),
};

app.prepare().then(() => {
  const server = express();

  // Use HTTPS for all routes
  server.use((req, res, next) => {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  https.createServer(httpsOptions, server).listen(443, (err) => {
    if (err) throw err;
    console.log('Next.js server is running over HTTPS on port 443 on https://mattondo.local/');
  });
});