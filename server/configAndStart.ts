import express from 'express';
const forceHttps = require('express-force-https');

const port = process.env.PORT || 4000;

export default function () {
  const app = express();

  app.use(forceHttps);

  ////////////////////////////////////////////////////////////////////////////////
  //   START SERVER   ////////////////////////////////////////////////////////////

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

  return app;
}
