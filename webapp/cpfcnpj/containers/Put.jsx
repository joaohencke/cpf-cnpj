import React, { Component } from 'react';
import toastr from 'toastr';
import { Form, MaskedInput, Content, Breadcrumb, Card } from '../../components';
import { put } from '../service';
import validations from '../../../common/validations';

toastr.options = {
  positionClass: 'toast-top-full-width',
  hideDuration: 300,
  timeOut: 60000,
};
class PutView extends Component {
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
    this.validateFn = this.validateFn.bind(this);
  }

  handleChange(e) {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validateFn() {
    const { value } = this.state;
    const parsedValue = value.replace(/[^a-zA-Z0-9 ]/g, '');

    if (
      parsedValue.length > 11 ||
      typeof validations.cpf(parsedValue) !== 'string' ||
      typeof validations.cnpj(parsedValue) !== 'string'
    ) {
      return true;
    }

    toastr.error('Formato inválido');
    return false;
  }

  async put(e) {
    e.preventDefault();

    const { submitting, value, _id, blacklist } = this.state;
    if (submitting) return;

    const parsedValue = value.replace(/[^a-zA-Z0-9 ]/g, '');

    const entry = {
      _id,
      blacklist: blacklist === 'true',
      value: parsedValue,
    };

    try {
      await put(entry);
      this.setState({
        _id: undefined,
        value: '',
        blacklist: undefined,
      });
    } catch (er) {
      toastr.error(er.message);
    }
  }

  componentWillMount() {
    console.log(this);
  }

  render() {
    const { value, submitting } = this.state;
    return (
      <Content>
        <div className="row header">
          <div className="col-auto">
            <Breadcrumb items={[{ text: 'Listagem', route: 'index' }, { text: '/Novo' }]} />
          </div>
        </div>
        <div className="row content">
          <div className="col-12">
            <Card>
              <Card.Body>
                <Form submit={this.put} validateFn={this.validateFn}>
                  <div className="form-row align-items-center">
                    <div className="col-auto">
                      <label htmlFor="value" className="sr-only">
                        CPF/CNPJ
                      </label>
                      <MaskedInput
                        id="value"
                        name="value"
                        className="form-control"
                        placeholder="CPF/CNPJ"
                        value={value}
                        onChange={this.handleChange}
                        required
                      />
                      <div className="invalid-feedback" />
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="blacklist"
                          name="blacklist"
                          onChange={this.handleChange}
                          value
                        />
                        <label htmlFor="blacklist" className="form-check-label">
                          Blacklist
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn btn-primary">
                        {submitting ? 'Salvando...' : 'Salvar'}
                      </button>
                    </div>
                  </div>
                </Form>
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

export default PutView;
