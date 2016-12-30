import should from 'should';
import PQ from '../../src/pattern/pq';

const cb = () => null;

describe('PQ', () => {
  describe('#add', () => {
    it('should default to level 0', () => {
      const pq = new PQ();
      pq.add('test');
      pq._q[0].length.should.equal(1);
    });
    it('should support gap in levels', () => {
      const pq = new PQ();
      pq.add('test', 1);
      pq.add('test 2', 100);
      let i = 0;
      pq.process((r) => { i++;}, cb);
      i.should.equal(2);
    });
  });
  describe('#process', () => {
    it('should stop process when trueish is returned', () => {
      const pq = new PQ();
      pq.add('test', 0);
      pq.add('test 2', 2);
      let i = 0;
      pq.process((r) => { i++; return true; }, cb);
      i.should.equal(1);
    });
    it('should support async process', () => {
      const pq = new PQ();
      pq.add('test', 0);
      pq.add('test 2', 2);
      pq.add('test 3', 2);
      let i = 0;
      pq.process((r, next) => { i++; next(null, r, true); }, cb);
      i.should.equal(1);
    });
  });
});
