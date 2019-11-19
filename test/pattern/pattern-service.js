import should from 'should';
import PatternService from '../../src/pattern/pattern-service';

describe.only('PatternService', () => {
  describe('#add', () => {
    it('should default to level 0', () => {
      const patternService = new PatternService();
      patternService.add((req) => req);
      patternService.match({},
        (req, res) => {
          console.log(req);
        });
    });
  });
});
