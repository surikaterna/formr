import should from 'should';
import JsxParser from '../../../src/core/jsx/parser';

describe('JsxParser', () => {
  describe('#parse', () => {
    it('should return correct type for JSX element', () => {
      const parser = new JsxParser();
      const result = parser.parse('<Ui></Ui>');
      result.type.should.equal('Ui');
    });
    it('should return children for JSX', () => {
      const parser = new JsxParser();
      const result = parser.parse(
        `<Ui>
          <Panel/>
        </Ui>`);
      result.type.should.equal('Ui');
      result.props.children[0].type.should.equal('Panel');
    });
    it('should put props correclty', () => {
      const parser = new JsxParser();
      const result = parser.parse(
        `<Ui item="name" test = "as">
        </Ui>`);
      result.type.should.equal('Ui');
      result.props.item.should.equal('name');
      result.props.test.should.equal('as');
    });
    it('should handle text children', () => {
      const parser = new JsxParser();
      const result = parser.parse(
        `<Ui><b>aloha</b>
        </Ui>`);
      result.type.should.equal('Ui');
    });
    it('should throw if tree does not match', () => {
      const parser = new JsxParser();
      should.throws(() => {
        parser.parse('<Ui></XYZ>');
      });
    });
  });
});
