import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

export default class App extends Component {

  static loadProps(callback) {
    fetch('http://localhost:3000/api/me')
      .then(res => res.json())
      .then(json => callback(null, {me: json}))
      .catch(error => callback(error));
  }

  render() {
    const { me } = this.props;
    return (
      <div>
        <h1>Hello {me.name}!</h1>
        <p>server date {me.date}!</p>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};
