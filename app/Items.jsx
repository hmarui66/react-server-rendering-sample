import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadItems } from './actions';

class Items extends Component {

  static fetchData() {
    return loadItems();
  }

  static propTypes = {
    items: PropTypes.array
  };

  componentWillMount() {
    const { dispatch } = this.props;
    if (this.props.didMount) {
      dispatch(loadItems());
    }
  }

  render() {
    const { items = [] } = this.props;
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

function mapStateToProps(state) {
  return {
    didMount: state.app.didMount,
    items: state.item.items
  };
}

export default connect(
  mapStateToProps
)(Items);
