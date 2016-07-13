// const isLetter = c => c.toLowerCase() !== c.toUpperCase();

/**
 * Not time to implement a expression parser/interpretator...
 */
export default class Evaluator {
  eval(expression, context) {
    // look away
    let expr = expression.toString();
    if (!expr.startsWith('this.') && expr[0] !== '{') {
      expr = `this.${expr}`;
    } else if (expr[0] === '{') {
      expr = `(${expr})`;
    }

    return function () {
      const res = eval(expr);  // eslint-disable-line no-eval
      return res;
    }.call(context);
  }
}
