import React, { Component } from 'react';
import BoundField from './bound-field';

const _componentConverter = {
  string: 'InputText',
  number: 'InputNumber',
  object: 'InputText'
};

export default class ModelField extends Component {
  render() {
    // schema, value, valuetype,
    console.log(this.props);
    console.log(this.props.value);
    const type = (this.props.schema && this.props.schema.type) || 'string';
    const fieldType = _componentConverter[type];
    const C = this.props.componentFactory(fieldType);
    return <C {...this.props}/>;
  }
}
