import React, { Component } from 'react';
import Expr from './expression';

class ComponentResolver {
  resolve(comDef) {
    if (comDef instanceof String) {
    } else {

    }
    return (<h>hej</h>);
  }
}

let val = 'Test';


// FormField
// FieldComponent
// BoundField
export default class Form extends Component {
  constructor(props) {
    super(props);
    this._resolve = this.props.resolver;
  }
  render() {
    const result = this.props.form.map(c => {
      const componentProps = { value: this.props.data[c.bind], children: this.props.children };
      const component = this.props.factory(c.type, componentProps);
      //const Field = BoundField(component);
      const Field = props => <b>Test</b>;
      return <Field {...componentProps}/>;
    });
    return <div>{result}</div>;
  }
}