import React, { Component } from 'react';
import Link from 'next/link';
import moment from 'moment';

import { Content, Breadcrumb, Form, Card } from '../components';
import { fetch } from '../services/cpfCnpjService';

class CPFList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      items: [],
      filter: '',
      page: 0,
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

    const items = await fetch({
      filter,
      page,
      order: `${order.reverse ? '-' : ``}order.by`,
    });

    this.setState({ items, fetching: false });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log('oi');
    if (e.target.name !== 'filter') return;
    const { timeout } = this.state;
    clearTimeout(timeout);

    this.setState({
      timeout: setTimeout(this.fetch, 500),
    });
  }

  render() {
    const { items } = this.state;
    return (
      <Content>
        <div className="row header">
          <div className="col-2">
            <Breadcrumb items={['Listagem']} />
          </div>
          <div className="col-10">
            <Link href="/novo">
              <button className="float-right btn btn-sm btn-primary" type="button">
                novo
              </button>
            </Link>
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
                    <a
                      href="#"
                      className="list-group-item list-group-item-action flex-column align-items-start"
                      key={x._id}
                    >
                      <h5>{x.value}</h5>

                      <small>
                        criado em&nbsp;
                        {moment(x.createdAt).format('DD/MM/YYYY hh:mm')}
                      </small>
                      {x.blacklist && <small className="float-right">blacklist</small>}
                    </a>
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
          `}
        </style>
      </Content>
    );
  }
}

export default CPFList;
