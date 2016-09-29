import should from 'should';
import Schema from '../../src/schema';

const SIMPEL_OBJECT = {
  type: 'object',
  properties: {
    name: { type: 'string' }
  }
};

describe('Schema', () => {
  describe('#getType', () => {
    it('should return string type for child', () => {
      const schema = new Schema(SIMPEL_OBJECT);
      schema.getType('name').should.equal('string');
    });
  });
  describe('#isObject', () => {
    it('should return true with no path', () => {
      const schema = new Schema(SIMPEL_OBJECT);
      const r = schema.isObject();
      r.should.equal(true);
    });
    it('should return false with name path', () => {
      const schema = new Schema(SIMPEL_OBJECT);
      const r = schema.isObject('name');
      r.should.equal(false);
    });
  });
  describe('#getProperties', () => {
    it('should return array with length same as properties', () => {
      const schema = new Schema(SIMPEL_OBJECT);
      const r = schema.getProperties();
      Object.keys(r).length.should.equal(1);
    });
  });
});
