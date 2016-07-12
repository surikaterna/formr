//const isLetter = c => c.toLowerCase() !== c.toUpperCase();   

/**
 * Not time to implement a expression parser/interpretator... 
 */
export default class Evaluator {
  constructor() {

  }

  eval(expression, context) {
    let expr = expression.toString();
    if (!expr.startsWith('this.')) {
      expr = 'this.' + expr;
    }

    return function () {
      // look away
      return eval(expr);
    }.call(context);
  }
}