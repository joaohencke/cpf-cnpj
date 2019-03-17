import React, { Component } from 'react';

import { Content, Breadcrumb, Form, Card } from '../components';

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
    };

    this.fetch = this.fetch.bind(this);
  }

  fetch() {}

  render() {
    return (
      <Content>
        <div className="row header">
          <div className="col-2">
            <Breadcrumb items={['Listagem']} />
          </div>
          <div className="col-10">
            <button className="float-right btn btn-sm btn-primary">novo</button>
          </div>
        </div>
        <div className="row content">
          <div className="col">
            <Card>
              <Card.Header className="card-header">
                <Form submit={this.fetch}>
                  <div className="form-group">
                    <input type="search" className="form-control" placeholder="Pesquisar..." />
                  </div>
                </Form>
              </Card.Header>
              <Card.Body>Dae migo</Card.Body>
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
