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
const BoundField2 = Field => function BoundField2(props) {
  return <div style={{ 'backgroundColor': 'red' }}><Field {...props}/></div >
}

const BoundField3 = Field => class extends Component {
  render() {
    console.log('B3', this.props);
    console.log('B3', Field);
    return <Field {...this.props}/>
  }
}
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
    //    const C = BoundField2(this.props.$componentFactory(fieldType));
    const TT = this.props.$componentFactory(fieldType);
    const C = BoundField3(TT);
//    const C = TT;
    //value=this.props.value.get();
    return <C {...props} value={props.$root.name} onChange={v=>this.props.onChange({name:v})}/>;
  }
}
