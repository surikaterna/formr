import React from 'react';
const isUpperCase = ch => ch === ch.toUpperCase();

/**
 * Converts from a java-script object like structure to a react element tree
 */
export default class ElementBuilder {
  constructor(componentFactory) {
    this._componentFactory = componentFactory || (() => null);
  }
  build(node, defaultProps) {
    let result;
    let type = node.type;
    let options = {};
    if (isUpperCase(type[0])) {
      type = this._componentFactory(type);
      if (typeof type === 'object') {
        options = type.options;
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
    const props = Object.assign({}, defaultProps, node.props);
    console.log(node.type, options);
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
