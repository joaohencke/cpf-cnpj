import React, { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import List from '../components/cpfCnpjList';
import Put from '../components/cpfCnpjPut';

class CPFList extends Component {
  render() {
    return (
      <div className="container">
        <Head />
        <Nav />
        <div className="row">
          <div className="col">
            <List />
          </div>
          <div className="col">
            <Put></Put>
          </div>
        </div>
      </div>
    );
  }
}

export default CPFList;
