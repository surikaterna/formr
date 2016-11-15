
function _notImplemented() {
  throw new Error('Not implemtend');
}

/**
 * Support us in the nine circles of hell which is json-schema
 */
export default class Schema {
  constructor(jsonSchema, parent, path) {
    this._schema = jsonSchema;
    this._root = parent ? parent._root : this;
    this._parent = parent;
    this._pathFromParent = path;
  }

  _getCurrentSchema(path) {
    let result = this._schema;
    if (path && path.length !== 0) {
      result = result.properties[path];
    }
    return result;
  }

  getType(path) {
    return this._getCurrentSchema(path).type;
  }

  getParent() {
    return this._parent;
  }

  getPathFromParent() {
    return this._pathFromParent;
  }

  getRoot() {
    return this._root;
  }

  getTitle() {
    return this._schema.title || this._pathFromParent || 'unknown';
  }

  getSchema(path) {
    const pathedSchema = this._getCurrentSchema(path);
    let result;
    if (pathedSchema === this) {
      result = this;
    } else {
      result = new Schema(pathedSchema, this, path);
    }
    return result;
  }

  getProperties(path) {
    if (!this.isObject(path)) {
      throw new Error(`Properties only exist in object, this is ${this.getType(path)}`);
    }
    const schema = this._getCurrentSchema(path);
    return schema.properties;
  }

  isRef(path) {
    _notImplemented(path);
  }

  isObject(path) {
    return this.isType(path, 'object');
  }

  isArray(path) {
    return this.isType(path, 'array');
  }

  isString(path) {
    return this.isType(path, 'string');
  }

  isType(path, type) {
    return this.getType(path) === type;
  }

  asJson() {
    return this._schema;
  }
}
