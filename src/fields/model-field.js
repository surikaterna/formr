import React, { Component } from 'react';
import bindField from './bound-field';
import Expression from '../expression/expression';

const _componentConverter = {
  string: 'InputText',
  number: 'InputNumber',
  object: 'InputText'
};

const extactSchemaPath = (expr) => expr.toString();

const _boundComponents = new Map();

export default class ModelField extends Component {

  _bind(component) {
    let result = _boundComponents.get(component);
    if (!result) {
      result = bindField(component);
      _boundComponents.set(component, result); // eslint-disable-line
    }
    return result;
  }

  render() {
    const type = (this.props.schema && this.props.schema.type) || 'string';
    const fieldType = _componentConverter[type];
    let Widget = this.props.$componentFactory(fieldType);
    if (this.props.value instanceof Expression) {
      Widget = this._bind(Widget);
    }
    return <Widget {...this.props}/>;
  }
}
