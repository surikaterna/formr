import should from 'should';
import { service } from '../../src/fields/patterned-field';

describe('PatternFieldService', () => {
  describe('#getWidget', () => {
    it('should create component fn for type=fn()', () => {
      const fn = () => 'test';
      const res = service.getWidget(null, { type: fn });
      fn.should.equal(res);
    });
    it('should create component InputText for type=string', () => {
      const fn = service.getWidget(null, { type: 'string', $formr: { componentFactory: (e) => { e.should.equal('InputText'); return 'test'; } } });
      fn.should.equal('test');
    });
    it('should create component InputText for type=InputText', () => {
      const fn = service.getWidget(null, { type: 'InputText', $formr: { componentFactory: (e) => { e.should.equal('InputText'); return 'test'; } } });
      fn.should.equal('test');
    });
  });
});
