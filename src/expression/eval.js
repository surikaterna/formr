
/**
 * Not the time to implement a JS expression parser/interpretator...
 */
export default class Evaluator {
  eval(expression, context) {
    // look away
    const expr = this._wrap(expression.getAsPath());
    const ctx = expression.getContext() || context;
    return function () {
      const res = eval(expr);  // eslint-disable-line no-eval
      return res;
    }.call(ctx);
  }

  set(expression, $$$val, context) {
    const expr = this._makeSet(expression.getAsPath());
    const ctx = expression.getContext() || context;
    return function () {
      eval(expr);  // eslint-disable-line no-eval
      return this;
    }.call(ctx);
  }
  _makeSet(expr) {
    return this._wrap(`${this._expr(expr)}=$$$val`);
  }
  _expr(expr) {
    let result = expr;
    if (result.length === 0) {
      result = 'this';
    } else if (!result.startsWith('this.') && result[0] !== '{') {
      result = `this.${result}`;
    }
    return result;
  }

  _wrap(expr) {
    return `(${this._expr(expr)})`;
  }
}
