import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const format = sec => {
  function pad(s) {
    return (s < 10 ? '0' : '') + s;
  }
  const hours = Math.floor(sec / (60 * 60));
  const minutes = Math.floor((sec % (60 * 60)) / 60);
  const seconds = Math.floor(sec % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
class SupportView extends Component {
  async componentWillMount() {
    const { fetch, setFetching } = this.props;

    setFetching(true);

    await fetch();
  }

  render() {
    const { fetching, data } = this.props;

    return (
      <div className="container">
        <div>
          Vamos ver uptime:
          <div className="uptime">{format(data.uptime)}</div>
          <div className="search-counter">{data.searchCounter}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.support });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupportView);
