import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { Card, Content } from '../../components';

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
      <Content>
        <Card>
          {fetching && (
            <Card.Body>
              <span className="alert alert-info">carregando...</span>
            </Card.Body>
          )}
          {!fetching && (
            <Card.Body>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="text-primary">Uptime</span>

                  <br />
                  <small>{format(data.uptime)}</small>
                </li>
                <li className="list-group-item">
                  <span className="text-primary">Nr. de consultas</span>

                  <br />
                  <small>{data.searchCounter}</small>
                </li>
              </ul>
            </Card.Body>
          )}
        </Card>
      </Content>
    );
  }
}

const mapStateToProps = state => ({ ...state.support });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupportView);
