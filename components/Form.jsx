import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      validated: false,
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

        const errorLabel = elem.parentNode.querySelector('.invalid-feedback');

        if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
          if (!elem.validity.valid) {
            errorLabel.textContent = elem.validationMessage;
          } else {
            errorLabel.textContent = '';
          }
        }
      }

      return false;
    }

    for (let i = 0; i < formLength; i += 1) {
      const elem = formEl[i];
      const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        errorLabel.textContent = '';
      }
    }

    return true;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { submitting } = this.state;
    const { submit } = this.props;
    if (submitting) return;

    this.setState({ validated: true });
    if (!this.validate()) return;

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
    // const props = { ...this.props };
    // let classNames = { this.props };
    let classes = [];
    const { children, classNames } = this.props;
    const { validated } = this.state;

    if (classNames.length) {
      classes = classNames;
    }

    if (validated) classes.push('was-validated');

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
};

Form.defaultProps = {
  children: undefined,
  classNames: '',
};

export default Form;
