import React, { Component } from 'react';
import BoundField from './bound-field';
import Expression from '../expression/expression';
import Evaluator from '../expression/eval';

const _componentConverter = {
  string: 'InputText',
  number: 'InputNumber',
  object: 'InputText'
};

const extactSchemaPath = (expr) => expr.toString();

export default class ModelField extends Component {

  render() {
    // schema, value, valuetype,
    console.log(this.props);
    console.log(this.props.value);
    const props = {...this.props};
    if (this.props.value instanceof Expression) {
      console.log('got expression');
      props.value = new Evaluator().eval(this.props.value);
    }

    const type = (this.props.schema && this.props.schema.type) || 'string';
    console.log('type', type);
    const fieldType = _componentConverter[type];
    const C = this.props.componentFactory(fieldType);

    return <C {...props}/>;
  }
}
