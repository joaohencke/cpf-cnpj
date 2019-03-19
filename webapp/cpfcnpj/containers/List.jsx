import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from '../../../routes';
import { Content, Breadcrumb, Form, Card, Pager } from '../../components';
import { mask } from '../service';
import * as actions from '../actions';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = { timeout: undefined };
    this.fetch = this.fetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.pager = this.pager.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  async fetch() {
    const { setFetching, fetch, filter, page, order } = this.props;

    setFetching(true);

    await fetch({
      filter,
      page,
      order: `${order.reverse ? '-' : ``}${order.by}`,
    });
  }

  pager(increment) {
    const { setFilter, page } = this.props;
    setFilter({
      page: page + increment,
    });
    setTimeout(this.fetch, 10);
  }

  handleChange(e) {
    const { setFilter } = this.props;
    setFilter({
      [e.target.name]: e.target.value,
    });
    if (e.target.name !== 'filter') return;
    const { timeout } = this.state;
    clearTimeout(timeout);

    this.setState({
      timeout: setTimeout(this.fetch, 500),
    });
  }

  render() {
    const { items = [], total = 0, fetching, page } = this.props;
    return (
      <Content>
        <div className="row header">
          <div className="col-4">
            <Breadcrumb items={[{ text: `Listagem - ${total} registros` }]} />
          </div>
          <div className="col-8">
            {/* eslint-disable-next-line */}
            <Link route="novo">
              <button className="float-right btn btn-sm btn-primary btn-action" type="button">
                novo
              </button>
            </Link>

            <button
              className="btn btn-sm btn-primary float-right btn-action"
              type="button"
              disabled={fetching}
              onClick={this.fetch}
            >
              {fetching ? 'atualizando' : 'atualizar'}
            </button>
          </div>
        </div>
        <div className="row content">
          <div className="col">
            <Card>
              <Card.Header className="card-header">
                <Form submit={this.fetch}>
                  <div className="form-group">
                    <input
                      type="search"
                      name="filter"
                      className="form-control"
                      placeholder="Pesquisar..."
                      onChange={this.handleChange}
                    />
                  </div>
                </Form>
              </Card.Header>
              <Card.Body>
                <div className="list-group">
                  {items.map(x => (
                    // eslint-disable-next-line
                    <Link
                      key={x._id}
                      route='editar'
                      params={{ _id: x._id }}
                    >
                      <button
                        type="button"
                        className="list-group-item list-group-item-action flex-column align-items-start"
                      >
                        <h5>{mask(x.value)}</h5>

                        <small>
                          criado em&nbsp;
                          {moment(x.createdAt).format('DD/MM/YYYY HH:mm')}
                        </small>
                        {x.blacklist && <small className="float-right">blacklist</small>}
                      </button>
                    </Link>
                  ))}
                </div>
                <Pager currentPage={page} total={parseInt(total / 10, 10) + 1} change={this.pager} />
              </Card.Body>
            </Card>
          </div>
        </div>

        <style jsx>
          {`
            .header {
              padding: 30px;
            }
            .btn-action {
              margin-left: 10px;
            }
          `}
        </style>
      </Content>
    );
  }
}

const mapStateToProps = state => ({ ...state.cpfcnpj.list });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListView);
