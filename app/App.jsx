import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello SSR!</h1>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};
