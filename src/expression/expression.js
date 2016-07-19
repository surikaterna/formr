import Evaluator from './eval';

export default class Expr {
  constructor(expr, context) {
    this._expression = expr;
    this._context = context;
  }
  static make(expr) {
    return new Expr(expr);
  }
  toString() {
    return `{${this._expression}}`;
  }

  withContext(context) {
    return new Expr(this._expression, context);
  }
  getContext() {
    return this._context;
  }

  get() {
    return new Evaluator().eval(this);
  }

  set(val) {
    return new Evaluator().set(this, val);
  }
  getAsPath() {
    return this._expression;
  }
}
