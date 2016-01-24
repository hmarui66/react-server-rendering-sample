import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  render() {
    const { items = [] } = this.props;
    return (
      <div>
        <h1>Hello SSR!</h1>
        <ul>
          {items.map(item => {
            return (<li key={item.id}>{item.id}: {item.text}</li>);
          })}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  items: PropTypes.array
};
