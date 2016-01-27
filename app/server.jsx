import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router'
import configureStore from './configureStore';
import routes from './routes'

function renderFullPage(renderedContent, initialState) {
  const appState = safeStringify(initialState);
  return `
  <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <title>React Server Rendering sample</title>
    </head>

    <div id="app">${renderedContent}</div>

    <script>
      var APP_STATE = ${appState};
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
      const store = configureStore({});
      const components = renderProps.components.filter(component => component.fetchData);
      Promise.all(components.map(component => store.dispatch(component.fetchData())))
        .then(() => {
          const renderedContent = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          const renderedPage = renderFullPage(renderedContent, store.getState());
          res.status(200).send(renderedPage);
        }).catch(error => {
          res.status(500).send(error.message);
        });
    } else {
      res.status(404).send('Not found')
    }
  })
};
