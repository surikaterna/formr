import React, { Component } from 'react';
import bindField from './bound-field';
import Expression from '../expression/expression';

const _componentConverter = {
  string: 'InputText',
  number: 'InputNumber',
  object: 'InputText'
};

// Cache previously bound components
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

  _hasExpression() {
    return this.props.value instanceof Expression;
  }

  _getWidget() {
    let result;
    let type;
    if (this.props.type) {

    } else if (this._hasExpression()) {
      const path = this.props.value.getAsPath();
      type = this.props.$schema.properties[path].type;
    }
    const fieldType = _componentConverter[type];
    result = this.props.$componentFactory(fieldType);

    return result;
  }

  render() {
    let Widget = this._getWidget();

    const type = (this.props.schema && this.props.schema.type) || 'string';

    let path;
    if (this._hasExpression()) {
      Widget = this._bind(Widget);
      path = this.props.value.getAsPath();
    }
    return <Widget {...this.props} key={path}/>;
  }
}
