import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import routes from './routes';
import AppContext from './AppContext';

function renderFullPage(renderedContent, propsArray) {
  const appProps = safeStringify(propsArray);
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
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const componentsArray = renderProps.components.filter(component => component.loadProps);
      let propsArray = [];
      Promise.all(
        componentsArray.map((component, index) => {
          return new Promise((resolve, reject) => {
            component.loadProps((error, fetchResult) => {
              if (error) {
                reject(error);
              } else {
                propsArray[index] = fetchResult;
                resolve();
              }
            });
          });
        })
      ).then(() => {
        const propsAndComponents = { componentsArray, propsArray };
        const renderedContent = renderToString(<AppContext { ...renderProps } { ...propsAndComponents } />);
        const renderedPage = renderFullPage(renderedContent, propsArray);
        res.status(200).send(renderedPage);
      }).catch(error => {
        res.status(500).send(error.message)
      });
    } else {
      res.status(404).send('Not found')
    }
  });
};
