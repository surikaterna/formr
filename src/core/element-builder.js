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

  build(node, defaultProps, formrProps) {
    return this._build(node, Object.assign({}, defaultProps, { $formr: formrProps }));
  }
  _build(node, formrProps) {
    let type = node.type;
    // let options;
    let isComponent = false;
    if (isUpperCase(type[0])) {
      isComponent = true;
      type = this._componentFactory(type);
      if (type && typeof type === 'object') {
        // options = type.options;

        // TODO: support type.factory as well for additional flexibility. (Needed for component)
        type = type.component;
      }
      if (!type) {
        return <b style="color:red;">Unable to resolve <i>{node.type}</i></b>;
      }
    }
    let children;
    if (node.props && node.props.children) {
      children = node.props.children.map(ch => this._child(ch, formrProps));
    }
    let props = Object.assign({}, formrProps, node.props);
    Object.keys(props).forEach((key) => {
      const prop = props[key];
      if (prop instanceof Expression) {
        // bind expression to parent value as context
        // todo do not use $root
        props[key] = prop.withContext(props.$formr.this);
      }
    });
    // have to support multiple bindings with same path? :)
    // if (props.value instanceof Expression) {
    //   props.key = props.value.getAsPath();
    // }

    if (!isComponent) {
      props = node.props;
    }

    if (children) {
      children = children.length === 1 ? children[0] : children;
    }
    return React.createElement(type, props, children);
  }

  _child(child, formrProps) {
    // different kind of children (expression, text)
    let result;
    if (typeof child === 'string' || child instanceof String) {
      result = child;
    } else {
      result = this._build(child, formrProps);
    }
    return result;
  }
}
