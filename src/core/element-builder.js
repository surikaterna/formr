import React from 'react';
const isUpperCase = ch => ch === ch.toUpperCase();

export default class ElementBuilder {
  constructor(componentLibrary) {
    this._library = componentLibrary;
  }
  build(node) {
    let type = node.type;
    if(isUppercase(type[0])) {
      type = this._library[type];
      if(!type) {
        return <b>Unable to resolve <i>{node.type}</i></b>;
      }
    }
    let children;
    if(node.props && node.props.children) {
      children = node.props.children.map(ch => {
        return this.build(ch);
      });
    }
    React.createElement(type, node.props, children);
  }
}