import PQ from './pq';

const _wrap = (fn) => {
  let f = fn;
  if (fn.length < 2) {
    f = (req, next) => {
      const r = fn();
      next(null, req, r);
    };
  }
  return f;
};

export default class PatternService {
  constructor(parent) {
    this._providers = new PQ();
    this._parent = parent;
  }

  /**
   * prio=0 (pre)
   * prio=1 (user)
   * prio=2 (post)
   * Prio should in general not be fiddled with)
   */
  add(provider, prio = 1) {
    this._providers.add(provider, prio);
  }

  match(req, callback) {
    this._providers.process((fn, next) => {
      const f = _wrap(fn);
      f(req, (err, r, res) => {
        next(null, r, res);
      });
    }, callback);
    /*
    for (let i = 0; i < this._providers.length; i++) {
      const widget = this._providers[i](req);
      if (widget) {
        return widget;
      }
    }
    throw new Error('Unable to resolve Widget for type', schema);
    */
  }
  subScope() {
    return new PatternService(this);
  }
}

/**
 * insertBefore
 * levels (prio?)
 */
