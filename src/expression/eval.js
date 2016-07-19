
/**
 * Not the time to implement a expression parser/interpretator...
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
    // looks lovely...
    return this._wrap(`${expr}=$$$val`);
  }
  _wrap(expr) {
    let result = expr;
    if (!result.startsWith('this.') && result[0] !== '{') {
      result = `this.${result}`;
    } else if (result[0] === '{') {
      result = `(${result})`;
    }
    return result;
  }
}
