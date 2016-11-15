import should from 'should';
import Schema from '../../../src/schema';
import Validator from '../../../src/schema/validation/validator';

const SIMPEL_OBJECT = {
  type: 'object',
  properties: {
    name: { type: 'string', format: 'email' }
  }
};

describe('Validator', () => {
  describe('#validate', () => {
    it('should return true for property', () => {
      const schema = new Schema(SIMPEL_OBJECT);
      const nameSchema = schema.getSchema('name');
      const validator = new Validator(nameSchema);
      validator.validate('aaa@example.org').length.should.equal(0);
    });
    it('should return errors for wrong property', () => {
      const schema = new Schema(SIMPEL_OBJECT);
      const nameSchema = schema.getSchema('name');
      const validator = new Validator(nameSchema);
    });
  });
});
