import React, { Component } from 'react';

class PutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  static getInitialProps({ query }) {
    console.log(query);
  }

  render() {
    const { data } = this.state;
    return (
      <div className="row">
        <div className="col">put PutView {data.a}</div>
      </div>
    );
  }
}

export default PutView;
