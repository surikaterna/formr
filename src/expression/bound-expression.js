import Evaluator from './eval';

export default class BoundExpression {
  constructor(expression, context) {
    this._expr = expression;
    this._ctx = null;
    if (context) {
      this.setContext(context);
    }
  }

  setContext(context) {
    this._ctx = context;
  }

  get() {
    return new Evaluator().eval(this._expr, this._ctx);
  }
}
