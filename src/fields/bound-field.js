import React, { Component } from 'react';

const BoundField = Field => class extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }
  handleChange(event) {
    // update real model (or both) instead
    this.setState({ value: event.target.value });
    val = event.target.value;
    console.log(val);
  }
  render() {
    return <Field {...this.props} value={this.state.value} onChange={e => this.handleChange(e) }/>
  }
};

export default BoundField;