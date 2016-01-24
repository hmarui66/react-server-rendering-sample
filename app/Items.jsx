import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Items extends Component {
  render() {
    const { items = [] } = this.props;
    return (
      <div>
        <h2>item list</h2>
        <Link to='/users'>usersへ</Link>
        <ul>
          {items.map(item => {
            return (<li key={item.id}>{item.id}: {item.name}</li>);
          })}
        </ul>
      </div>
    );
  }
}

Items.propTypes = {
  items: PropTypes.array
};
