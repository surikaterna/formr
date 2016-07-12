import React, { Component } from 'react';
import BoundField from './bound-field';

const _componentConverter =  {
  'string': 'InputText',
  'number': 'InputNumber'
}

export default class ModelField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('ModelField', this.props);
    const fieldType = _componentConverter[this.props.schema.type];
    const Component = this.props.componentFactory(fieldType);
    return <Component {...this.props}/>
  }
}