export default class Expr {
  constructor(expr) {
    this._expression = expr;
  }
  static make(expr) {
    return new Expr(expr);
  }
  toString() {
    return this._expression;
  }
}
