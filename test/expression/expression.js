import should from 'should';
import Expression from '../../src/expression';

describe('Expression', () => {
  describe('#set', () => {
    it('should return value that was set', () => {
      const o = { name: 'test', age: 10 };
      const e = Expression.make('this.name');
      e.withContext(o).set('abc');
      o.name.should.equal('abc');
    });
  });
});
