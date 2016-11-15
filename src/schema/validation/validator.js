// maybe this should not be a class...

import Ajv from 'ajv';

export default class Validator {
  constructor(schema) {
    this._schema = schema;
  }

  validate(value) {
    const ajv = new Ajv();
    const schema = this._schema.asJson();
    const result = ajv.validate(schema, value);
    // console.log('AA', result, schema, value);
    return result === true ? [] : ajv.errors;
  }
}
