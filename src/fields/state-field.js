import React, { Component } from 'react';
import Validator from '../schema/validation/validator';

export default (FormComponent) => class FieldWithState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pristine: props.pristine || true,
      touched: props.touched || false,
      visited: props.visited || false,
      valid: props.valid || true,
      errors: []
    };
  }
  _validate(val) {
    let errors = [];
    if (this.props.$formr && this.props.$formr.schema) {
      const validator = new Validator(this.props.$formr.schema);
      errors = validator.validate(val);
    }
    this.setState({ errors });
  }
  render() {
    return <FormComponent {...this.props}
      onFocus={() => this.setState({ visited: true, active: true })}
      onBlur={() => { this.setState({ touched: true, active: false }); this._validate(this.props.value); } }
      onChange={(e) => { this.setState({ pristine: false }); this.props.onChange(e); this._validate(e); } }
      errorText={this.state.errors.reduce((prev, curr) => `${prev} ${curr.message}`, '')}
      />;
  }
};
