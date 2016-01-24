import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Users extends Component {
  render() {
    const { users = [] } = this.props;
    return (
      <div>
        <h2>user list</h2>
        <Link to='/items'>itemsへ</Link>
        <ul>
          {users.map(user => {
            return (<li key={user.id}>{user.id}: {user.name}</li>);
          })}
        </ul>
      </div>

    );
  }
}

Users.propTypes = {
  users: PropTypes.array
};
