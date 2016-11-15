import React, { Component } from 'react';
import BaseInput from './base-input';

export default class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: `${props.value}`
    };
  }
  render() {
    return <BaseInput {...this.props} value={this.state.value} type="number" onChange={(e) => { this.setState({ value: e }); this.props.onChange(Number(e)); } } />;
  }
}
