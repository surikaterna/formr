
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
    if (path) {
      result = result.properties[path];
    }
    return result;
  }

  getType(path) {
    return this._getCurrentSchema(path).type;
  }
  getPropertiesAtPath(path) {
    if (!this.isObject(path)) {
      throw new Error(`Properties only exist in object, this is ${this.getType(path)}`);
    }
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

  isType(path, type) {
    return this.getType(path) === type;
  }
}
