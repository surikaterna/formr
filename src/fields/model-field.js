import React, { Component } from 'react';
import bindField from './bound-field';
import Expression from '../expression/expression';
import Schema from '../schema';

const _componentConverter = {
  string: 'InputText',
  number: 'InputNumber',
  object: 'SchemaObject'
};

// Cache previously bound components
const _boundComponents = new Map();

/**
 * ModelField
 */
export default class ModelField extends Component {

  _bind(component) {
    let result = _boundComponents.get(component);
    if (!result) {
      result = bindField(component);
      _boundComponents.set(component, result);
    }
    return result;
  }

  _hasExpression() {
    return this.props.value instanceof Expression;
  }

  _getWidgetFromType(type) {
    const fieldType = _componentConverter[type] || type;
    return this.props.$componentFactory(fieldType);
  }

  /**
   * if props.type = 'function' use it as widget
   * if props.type = 'json-schema-type' resolve to correct component type
   * else if props.type = 'component-type' resolve component
   * else if no props.type but props.value is an expression,
   * take path from expression and resolve the corresponding type from schema
   * else use type = string
   *
   */
  _getWidget() {
    let result;
    if (this.props.type) {
      const type = this.props.type;
      if (typeof type === 'function') {
        result = type;
      } else {
        result = this._getWidgetFromType(type);
      }
    } else if (this._hasExpression()) {
      const path = this.props.value.getAsPath();
      const type = new Schema(this.props.$schema).getType(path);
      result = this._getWidgetFromType(type);
    } else {
      result = this._getWidgetFromType('string');
    }
    return result;
  }
  _getProps() {
    const props = {};
    if (this._hasExpression()) {
      const path = this.props.value.getAsPath();
      const schema = new Schema(this.props.$schema).getSchema(path).asJson();
      props.$schema = schema;
    }
    return props;
  }

  render() {
    let Widget = this._getWidget();

    if (this._hasExpression()) {
      Widget = this._bind(Widget);
    }
    const props = this._getProps();
    return <Widget {...this.props} {...props}/>;
  }
}
