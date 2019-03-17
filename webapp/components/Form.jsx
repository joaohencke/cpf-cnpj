import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

toastr.options = {
  positionClass: 'toast-top-full-width',
  hideDuration: 300,
  timeOut: 60000,
};

class Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      submitting: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.__mounted = true;
  }

  componentWillUnmount() {
    this.__mounted = false;
  }

  validate() {
    const formEl = this.formElm;
    const formLength = formEl.length;

    if (!formEl.checkValidity()) {
      for (let i = 0; i < formLength; i += 1) {
        const elem = formEl[i];
        if (elem.nodeName.toLowerCase() !== 'button') {
          if (!elem.validity.valid) {
            toastr.error('O formulário contém dados inválidos');
            return false;
          }
        }
      }

      return false;
    }

    return true;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { submitting } = this.state;
    const { submit, validateFn } = this.props;
    if (submitting) return;

    if (!this.validate()) return;
    if (validateFn && !validateFn()) return;
    this.setState({ submitting: true });
    try {
      await submit(e);
    } catch (err) {
      throw err;
    } finally {
      if (this.__mounted) this.setState({ submitting: false });
    }
  }

  render() {
    let classes = [];
    const { children, classNames } = this.props;

    if (classNames.length) {
      classes = classNames;
    }

    return (
      <form
        ref={form => {
          this.formElm = form;
        }}
        className={classes}
        onSubmit={this.handleSubmit}
        noValidate
      >
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string,
  submit: PropTypes.func.isRequired,
  validateFn: PropTypes.func,
};

Form.defaultProps = {
  children: undefined,
  classNames: '',
  validateFn: undefined,
};

export default Form;
