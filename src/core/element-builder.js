import React from 'react';
import Expression from '../expression/expression';

const isUpperCase = ch => ch === ch.toUpperCase();

/**
 * Converts from a "java-script object like structure" to a react element tree
 */
export default class ElementBuilder {
  constructor(componentFactory) {
    this._componentFactory = componentFactory || (() => null);
  }
  build(node, defaultProps) {
    let result;
    let type = node.type;
    let options = {};
    console.log('default', defaultProps);
    if (isUpperCase(type[0])) {
      type = this._componentFactory(type);
      if (type && typeof type === 'object') {
        options = type.options;
        // TODO: support type.factory as well for additional flexibility. (Needed for component)
        type = type.component;
      }
      if (!type) {
        return <b>Unable to resolve <i>{node.type}</i></b>;
      }
    }
    let children;
    if (node.props && node.props.children) {
      children = node.props.children.map(ch => this._child(ch, defaultProps));
    }
    let props = Object.assign({}, defaultProps, node.props);
    Object.keys(props).forEach((key) => {
      const prop = props[key];
      if (prop instanceof Expression) {
        // todo do not use $root
        props[key] = prop.withContext(props.$root);
      }
    });
    console.log('keys', Object.keys(props));

    if (children) {
      children = children.length === 1 ? children[0] : children;
      result = React.createElement(type, props, children);
    } else {
      result = React.createElement(type, props);
    }
    return result;
  }
  
  _child(child, defaultProps) {
    // different kind of children (expression, text)
    let result;
    if (typeof child === 'string' || child instanceof String) {
      result = child;
    } else {
      result = this.build(child, defaultProps);
    }
    return result;
  }
}
