import React, { Component } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Router } from '../../../routes';
import { Form, MaskedInput, Content, Breadcrumb, Card } from '../../components';
import * as actions from '../actions';
import validations from '../../../common/validations';

toastr.options = {
  positionClass: 'toast-top-full-width',
  hideDuration: 300,
  timeOut: 60000,
};
class PutView extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.put = this.put.bind(this);
    this.validateFn = this.validateFn.bind(this);
  }

  static getInitialProps({ query }) {
    return { query };
  }

  componentWillMount() {
    const { query } = this.props;
    if (!query) return;
    const { _id } = query;
    if (_id) this.get(_id);
  }

  componentWillUnmount() {
    const { modelChange } = this.props;
    modelChange({
      _id: undefined,
      value: undefined,
      blacklist: false,
    });
  }

  async get(id) {
    const { getFromServer } = this.props;
    getFromServer(id);
  }

  handleChange(e) {
    const { modelChange } = this.props;

    modelChange({
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  }

  validateFn() {
    const { value } = this.props;
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
    const { submitting, value, _id, blacklist, put, setSubmitting } = this.props;
    if (submitting) return;

    setSubmitting(true);

    const parsedValue = value.replace(/[^a-zA-Z0-9 ]/g, '');

    const entry = {
      _id,
      blacklist,
      value: parsedValue,
    };

    try {
      await put(entry);
      Router.push('/');
    } catch (er) {
      toastr.error(er.message);
    } finally {
      setTimeout(setSubmitting.bind(null, false), 10);
    }
  }

  render() {
    const { value, submitting, blacklist, _id } = this.props;
    const pageTitle = _id === undefined ? ' /Novo' : ' /Editar';

    return (
      <Content>
        <div className="row header">
          <div className="col-auto">
            <Breadcrumb items={[{ text: 'Listagem', route: 'index' }, { text: pageTitle }]} />
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
                          checked={blacklist}
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

const mapStateToProps = state => ({ ...state.cpfcnpj.put });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PutView);
