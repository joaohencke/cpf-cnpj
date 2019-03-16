import React, { Component } from 'react';
import MaskedInput from '../components/cpfCnpjInputMask';
import { put } from '../services/cpfCnpjService';

class Put extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: undefined,
      value: '',
      blacklist: false,
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
    if (!this.state.value) return alert('informe valor valido');
    const params = {
      ...this.state,
      blacklist: this.state.blacklist === 'true',
      value: this.state.value.replace(/[^a-zA-Z0-9 ]/g, ''),
    };
    const data = await put(params);
    console.log(data);
    this.setState({
      _id: undefined,
      value: '',
      blacklist: false,
    });
  }
  render() {
    return (
      <form onSubmit={this.put}>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label htmlFor="value" className="sr-only">CPF/CNPJ</label>
            <MaskedInput id="value" name="value" className="form-control" placeholder="CPF/CNPJ" value={this.state.value} onChange={this.handleChange} />
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="blacklist" name="blacklist" onChange={this.handleChange} value={true} />
              <label htmlFor="blacklist" className="form-check-label">Blacklist</label>
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">Salvar</button>
          </div>
        </div>
      </form>
    )
  }
}

export default Put;