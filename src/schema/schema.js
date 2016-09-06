
function _notImplemented() {
  throw new Error('Not implemtend');
}

/**
 * Support us in the nine circles of hell which is json-schema
 */
export default class Schema {
  constructor(jsonSchema) {
    this._schema = jsonSchema;
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

  getSchema(path) {
    return new Schema(this._getCurrentSchema(path));
  }

  getProperties(path) {
    if (!this.isObject(path)) {
      throw new Error(`Properties only exist in object, this is ${this.getType(path)}`);
    }
    const props = [];
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
