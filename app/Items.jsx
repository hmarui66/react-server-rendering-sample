import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';

export default class Items extends Component {

  static loadProps(callback) {
    fetch('http://localhost:3000/api/items')
      .then(res => res.json())
      .then(json => callback(null, {items: json}))
      .catch(error => callback(error));
  }

  static propTypes = {
    items: PropTypes.array
  };

  static contextTypes = {
    didMount: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: props.items
    };
  }

  componentWillMount() {
    if (this.context.didMount) {
      Items.loadProps((ignore, res) => {
        this.setState({ items: res.items });
      });
    }
  }

  render() {
    const { items = [] } = this.state;
    return (
      <div>
        <h2>item list</h2>
        <Link to='/users'>usersへ</Link>
        <ul>
          {items.map(item => {
            return (<li key={item.id}>{item.id}: {item.text}</li>);
          })}
        </ul>
      </div>
    );
  }
}
