import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import fetch from 'isomorphic-fetch';
import App from 'App';

function renderFullPage(renderedContent, initialProps) {
  const appProps = safeStringify(initialProps);
  return `
  <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <title>React Server Rendering sample</title>
    </head>

    <div id="app">${renderedContent}</div>

    <script>
      var APP_PROPS = ${appProps};
    </script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
    </body>
    </html>

  `;
}

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

export default function render(req, res) {
  fetch('http://localhost:3000/api/items')
    .then(apiResult => apiResult.json())
    .then(items => {
      const initialProps = { items };
      const renderedContent = renderToString(<App {...initialProps} />);
      const renderedPage = renderFullPage(renderedContent, initialProps);
      res.status(200).send(renderedPage);
    }).catch(error => {
      res.status(500).send(error.message);
    });
};
