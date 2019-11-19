const _wrap = (fn) => {
  let f = fn;
  if (fn.length < 2) {
    f = (req, next) => {
      const r = fn(req);
      next(null, req, r);
    };
  }
  return f;
};

const _each = (arr, fn, cb) => {
  let i = 0;
  const next = (err, req, res) => {
    if (res !== undefined) {
      cb(null, res);
    } else {
      if (i >= arr.length) {
        cb(null);
      } else {
        fn(arr[i++], i - 1, next);
      }
    }
  };
  next();
};

export default class PQ {
  constructor() {
    this._q = [];
  }
  add(value, level = 0) {
    this._ensureLevel(level);
    this._q[level].push(value);
  }

  process(fn, cb, fromLevel = 0, toLevel = Number.MAX_VALUE) {
    const arr = this._q.slice(fromLevel, toLevel);
    _each(arr, (req, i, next) => {
      if (req !== undefined) {
        this.processLevel(fn, req, (err, res) => next(err, req, res));
      } else {
        next(null, req);
      }
    }, cb);
  }

  processLevel(fn, level, cb) {
    _each(level, (req, i, next) => {
      _wrap(fn)(req, next);
    }, cb);
  }

  levels() {
    return this._q.length;
  }

  _ensureLevel(level) {
    if (!this._q[level]) {
      this._q[level] = [];
    }
  }
}
