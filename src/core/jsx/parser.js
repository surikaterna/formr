import JsxLexer from './lexer';
import Expression from '../../expression';

/**
 * Support our subset of JSX
 * @todo: should rework to meet JSX standard naming
 */
export default class JsxParser {
  parse(jsx) {
    this._lexer = new JsxLexer(jsx);
    return this._parse();
  }
  _parse() {
    return this._element();
  }
  _element() {
    const node = {};
    // opening element
    const token = this._next('startTag');
    node.type = token.text;
    const attributes = this._attributes();
    if (attributes) {
      node.props = attributes;
    }
    // Children
    const children = this._children();
    if (children.length > 0) {
      node.props = Object.assign({}, node.props, { children });
    }
    // closing element
    const end = this._next('endTag');
    if (end.text && end.text !== node.type) {
      throw new Error(`Start / End tag does not match: ${node.type} | ${end.text}`);
    }
    return node;
  }
  _attributes() {
    const props = {};
    let found = false;
    // TODO: spread expression
    while (this._lexer.isNext('attributeName')) {
      found = true;
      Object.assign(props, this._attribute());
    }
    return found ? props : undefined;
  }
  _attribute() {
    const name = this._lexer.next();
    this._next('assign');
    return { [name.text]: this._value() };
  }

  _value() {
    const t = this._lexer.next();
    let val;
    if (t.type === 'expression') {
      val = Expression.make(t.text);
    } else {
      val = t.text;
    }
    return val;
  }

  _children() {
    const children = [];
    let child;
    while (child = this._child()) { // eslint-disable-line no-cond-assign
      children.push(child);
    }
    return children;
  }

  _child() {
    let res;
    if (this._lexer.isNext('startTag')) {
      res = this._element();
    } else {
      res = this._text();
      if (!res) {
        res = this._expression();
      }
    }
    return res;
  }
  _expression() {
    return this._lexer.isNext('expression') ? Expression.make(this._next().text) : undefined;
  }
  _text() {
    let res;
    if (this._lexer.isNext('text') || this._lexer.isNext('literal')) {
      res = this._next().text;
    } else if (this._lexer.isNext('string')) {
      // todo we will convert single quoted to double... text...
      res = `"${this._next().text}"`;
    }
    return res;
  }

  _next(expected) {
    const next = this._lexer.next();
    if (expected && next.type !== expected) {
      throw new Error(`Unable to parse, expected: ${expected}`);
    }
    return next;
  }
}
