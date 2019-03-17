import React, { Component } from 'react';
import moment from 'moment';

import { Link } from '../../../routes';
import { Content, Breadcrumb, Form, Card } from '../../components';
import { fetch, mask } from '../service';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      items: [],
      filter: '',
      page: 0,
      total: 0,
      order: {
        by: 'createdAt',
        reverse: true,
      },
      timeout: undefined,
    };

    this.fetch = this.fetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  async fetch() {
    const { fetching, filter, page, order } = this.state;

    if (fetching) return;

    this.setState({ fetching: true });

    const { items, total } = await fetch({
      filter,
      page,
      order: `${order.reverse ? '-' : ``}${order.by}`,
    });
    this.setState({ items, total, fetching: false });
  }

  handleChange(e) {
    this.setState({
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
    const { items, total, fetching } = this.state;
    return (
      <Content>
        <div className="row header">
          <div className="col-4">
            <Breadcrumb items={[{ text: `Listagem - ${total} registros`, key: 12 }]} />
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
                      params={{ id: x._id }}
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

export default ListView;
