import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadMe, didMount } from './actions';

class App extends Component {

  static fetchData() {
    return loadMe();
  }

  static propTypes = {
    children: PropTypes.object
  };

  componentWillMount() {
    const { dispatch } = this.props;
    if (this.props.didMount) {
      dispatch(loadMe());
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(didMount());
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

function mapStateToProps(state) {
  return {
    didMount: state.app.didMount,
    me: state.app.me
  };
}

export default connect(
  mapStateToProps
)(App);
