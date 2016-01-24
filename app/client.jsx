import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';

const props = window.APP_PROPS;
ReactDOM.render(<App { ...props } />, document.getElementById('app'))
