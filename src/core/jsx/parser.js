import JsxLexer, {TokenTypes} from './lexer';
/**
 * Support our subset of JSX
 */
export default class JsxParser {
  constructor() {
  }
  parse(jsx) {
    this._stack = [];
    this._current;
    const lexer = new JsxLexer(jsx);
    this._parse(lexer);
    return this._stack[0];   
  }

  _parse(lexer) {
    if(lexer.isNext('startTag')) {
      const node = this._current = {};
      const token = lexer.next();
      node.type = token.text;
      this._stack.push(node);
    } else if(lexer.isNext(endTag)) {
      this._stack.pop();
    }
  }
}
