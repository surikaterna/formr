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

// TODO: extend to support proper paths...
const valueSetter = (object, path, value) => object[path] = value;

export default class ModelField extends Component {

  render() {
    // schema, value, valuetype,
    const props = {...this.props };
    let {schema, value} = props;
    if (this.props.value instanceof Expression) {
      console.log('got expression');
      const path = this.props.value.toString();
      console.log('PATH', path);
      props.value = new Evaluator().eval(this.props.value);
    }

    const type = (this.props.schema && this.props.schema.type) || 'string';
    const fieldType = _componentConverter[type];
    const C = this.props.$componentFactory(fieldType);
    console.log(C);
    return <C {...props} onChange={(e) => this.props.onChange(Object.assign({}, {}, { name: e })) }/>;
  }
}
