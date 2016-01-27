import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadUsers } from './actions';

export default class Users extends Component {

  static fetchData() {
    return loadUsers();
  }

  static propTypes = {
    users: PropTypes.array
  };

  componentWillMount() {
    const { dispatch } = this.props;
    if (this.props.didMount) {
      dispatch(loadUsers());
    }
  }

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

function mapStateToProps(state) {
  return {
    didMount: state.app.didMount,
    users: state.user.users
  };
}

export default connect(
  mapStateToProps
)(Users);
