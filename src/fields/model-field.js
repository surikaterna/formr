import React, { Component } from 'react';
import bindField from './bound-field';
import stateField from './state-field';
import Expression from '../expression/expression';

const _componentConverter = {
  string: 'InputText',
  number: 'InputNumber',
  object: 'SchemaObject',
  array: 'SchemaArray'
};

/**
 * ModelField
 */
export default class ModelField extends Component {

  constructor(props) {
    super(props);
    let Widget = stateField(this._getWidget());
    if (this._hasExpression()) {
      Widget = bindField(Widget);
    }
    this.state = { Widget };
  }

  _hasExpression() {
    return this.props.value instanceof Expression;
  }

  _getWidgetFromType(type) {
    const fieldType = _componentConverter[type] || type;
    return this.props.$formr.componentFactory(fieldType);
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
      const type = this.props.$formr.schema.getType(path);
      result = this._getWidgetFromType(type);
    } else if (this.props.$formr && this.props.$formr.schema) {
      const type = this.props.$formr.schema.getType();
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
      const schema = this.props.$formr.schema.getSchema(path);
      props.title = schema.getTitle();
      props.$formr = Object.assign({}, this.props.$formr, { schema });
    }
    return props;
  }

  render() {
    const { Widget } = this.state;
    const props = this._getProps();
    return <Widget {...this.props} {...props} onChange={(e) => { console.log(e, props, this.props); this.props.onChange(e) } } />;
  }
}
