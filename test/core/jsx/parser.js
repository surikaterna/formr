import should from 'should';
import JsxParser from '../../../src/core/jsx/parser';

describe('JsxParser', ()=> {
  describe.only('#parser', ()=>{
    it('should return correct type for JSX element', ()=>{
      const parser = new JsxParser();
      const result = parser.parse(`<Ui></Ui>`);
      result.type.should.equal('Ui');
    });
  });
});