import JsxLexer, {TokenTypes} from './lexer';
import Expression from '../../expression';
/**
 * Support our subset of JSX
 */
export default class JsxParser {
  constructor() {
  }
  parse(jsx) {
    this._lexer = new JsxLexer(jsx);
    return this._parse();
  }
  _parse() {
    if (this._lexer.isNext('startTag')) {
      return this._node()
    } else {
      throw new Error('uh oh', this._lexer.peek());
    }
  }
  _node() {
    const node = {};
    const token = this._lexer.next();
    node.type = token.text;
    const props = this._props();
    if (props) {
      node.props = props;
    }
    const children = this._children();
    if (children.length > 0) {
      node.props = Object.assign({}, node.props, { children });
    }
    this._skipNext('endTag');
    return node;
  }
  _props() {
    const props = {};
    let found = false;

    while (this._lexer.isNext('literal')) {
      found = true;
      Object.assign(props, this._prop());
    }
    return found ? props : undefined;
  }
  _prop() {
    const name = this._lexer.next();
    this._skipNext('assign');
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

  _children(node) {
    const children = [];
    while (this._lexer.isNext('startTag')) {
      children.push(this._node());
    }
    return children;
  }

  _skipNext(expected) {
    const next = this._lexer.next();
    if (next.type !== expected) {
      throw new Error('Unable to parse, expected: ' + expected);
    }
  }
}
