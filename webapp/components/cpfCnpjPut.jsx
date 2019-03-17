import React, { Component } from 'react';
import MaskedInput from './cpfCnpjInputMask';
import Form from './Form';
import { put } from '../services/cpfCnpjService';

class Put extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: undefined,
      value: '',
      blacklist: false,
      submitting: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.put = this.put.bind(this);
  }
  handleChange(e) {
    console.log(e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  async put(e) {
    e.preventDefault();

    if (this.state.submitting) return;
    if (!this.state.value) return alert('informe valor valido');

    const params = {
      _id: this.state._id,
      blacklist: this.state.blacklist === 'true',
      value: this.state.value.replace(/[^a-zA-Z0-9 ]/g, ''),
    };
    const data = await put(params);
    console.log(data);
    this.setState({
      _id: undefined,
      value: '',
      blacklist: undefined,
    });
  }
  render() {
    return (
      <div className='card'>
        <div className="card-body">
          <nav className="breadcrumb">
            <a className="breadcrumb-item">
              Adicionar
          </a>
          </nav>
          <Form submit={this.put}>
            <div className="form-row align-items-center">
              <div className="col-auto">
                <label htmlFor="value" className="sr-only">CPF/CNPJ</label>
                <MaskedInput id="value" name="value" className="form-control" placeholder="CPF/CNPJ" value={this.state.value} onChange={this.handleChange} required />
                <div className="invalid-feedback" />
              </div>
              <div className="col-auto">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="blacklist" name="blacklist" onChange={this.handleChange} value={true} />
                  <label htmlFor="blacklist" className="form-check-label">Blacklist</label>
                </div>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">{this.state.submitting ? 'Salvando...' : 'Salvar'}</button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default Put;