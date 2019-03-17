import React, { Component } from 'react';
import { fetch } from '../services/cpfCnpjService';

class List extends Component {
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
      }
    }

    this.fetch = this.fetch.bind(this);

  }

  componentWillMount() {
    this.fetch();
  }
  async fetch() {

    this.setState({ fetching: true });

    const items = await fetch({
      filter: this.state.filter,
      order: `${this.state.order.reverse ? '-' : ''}${this.state.order.by}`,
      page: this.state.page,
    });

    this.setState({
      items,
      fetching: false,
    });

  }

  render() {

    return (
      <nav className="breadcrumb">
        <a className="breadcrumb-item">
          Listagem
        </a>
      </nav>
    )
  }
}

export default List;