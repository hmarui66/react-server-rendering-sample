import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';

export default class Users extends Component {

  static loadProps(callback) {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(json => callback(null, {users: json}))
      .catch(error => callback(error));
  }

  static propTypes = {
    users: PropTypes.array
  };

  static contextTypes = {
    didMount: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      users: props.users
    };
  }

  componentWillMount() {
    if (this.context.didMount) {
      Users.loadProps((ignore, res) => {
        this.setState({ users: res.users });
      });
    }
  }

  render() {
    const { users = [] } = this.state;
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
