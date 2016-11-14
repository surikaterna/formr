import React, { Component } from 'react';
import Validator from '../schema/validation/validator';

export default (FormComponent) => class FieldWithState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      touched: false,
      visited: false,
      valid: true,
      errors: []
    };
  }
  _validate(val) {
    let errors = [];
    if (this.props.$formr && this.props.$formr.schema) {
      const validator = new Validator(this.props.$formr.schema);
      errors = validator.validate(val);
      console.log('VAL', errors);
    } else {
      console.log('NO VAL ', this.props);
    }
    this.setState({ errors });
  }
  render() {
    console.log('STATE', this.state, this.props);
    return <FormComponent {...this.props}
      onFocus={() => this.setState({ visited: true, active: true })}
      onBlur={() => { this.setState({ touched: true, active: false }); this._validate(this.props.value); } }
      onChange={(e) => { this.setState({ pristine: false }); this.props.onChange(e); this._validate(e); } }
      errorText={this.state.errors.reduce((prev, curr) => `${prev} ${curr.message}`, '')}
      />;
  }
};
