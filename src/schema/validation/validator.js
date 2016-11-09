// maybe this should not be a class...
export class Validator {
  constructor(schema) {
    this._schema = schema;
  }

  validate(value) {
    return true;
  }
}
