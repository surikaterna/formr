import should from 'should';
import JsxLexer from '../../../src/core/jsx/lexer';

describe('JsxLexer', () => {
  describe('#next', () => {
    it('should identify comment', () => {
      const lexer = new JsxLexer('<!-- My Comment -->');
      lexer.next().type.should.equal('comment');
    });
    it('should contain comment text', () => {
      const lexer = new JsxLexer('<!-- My Comment -->');
      lexer.next().text.should.equal(' My Comment ');
    });
    it('should lex multiple comments', () => {
      const lexer = new JsxLexer('<!-- My Comment --><!--2-->');
      lexer.next().text.should.equal(' My Comment ');
      lexer.next().text.should.equal('2');
    });
    it('should identify start tag', () => {
      const lexer = new JsxLexer('<Ui>');
      lexer.next().type.should.equal('startTag');
    });
    it('should contain tag name', () => {
      const lexer = new JsxLexer('<Ui>');
      lexer.next().text.should.equal('Ui');
    });
    it('should lex multiple start tags', () => {
      const lexer = new JsxLexer('<Ui><Ui2>');
      lexer.next().text.should.equal('Ui');
      lexer.next().text.should.equal('Ui2');
    });
    it('should lex tag with attributes', () => {
      const lexer = new JsxLexer('<Ui ast="123"><Ui2>');
      lexer.next().type.should.equal('startTag');
      lexer.next().type.should.equal('attributeName');
      lexer.next().type.should.equal('assign');
      lexer.next().type.should.equal('string');
      lexer.next().type.should.equal('startTag');
    });
    it('should lex end tag', () => {
      const lexer = new JsxLexer('</Ui>');
      lexer.next().type.should.equal('endTag');
    });
    it('should lex string', () => {
      const lexer = new JsxLexer('"test"');
      const t = lexer.next();
      t.type.should.equal('string');
      t.text.should.equal('test');
    });
    it('should lex string with expr', () => {
      const lexer = new JsxLexer('"{test}"');
      const t = lexer.next();
      t.type.should.equal('string');
      t.text.should.equal('{test}');
    });
    it('should lex string with espaced "', () => {
      const lexer = new JsxLexer('"aa\\"aa"');
      const t = lexer.next();
      t.type.should.equal('string');
      t.text.should.equal('aa\\"aa');
    });
    it('should lex selfclosing as end tag', () => {
      const lexer = new JsxLexer('/>');
      lexer.next().type.should.equal('endTag');
    });
    it('should lex tag with attributes and expression', () => {
      const lexer = new JsxLexer('<Ui ast={a}></Ui>');
      lexer.next().type.should.equal('startTag');
      lexer.next().type.should.equal('attributeName');
      lexer.next().type.should.equal('assign');
      lexer.next().type.should.equal('expression');
      lexer.next().type.should.equal('endTag');
    });
    it('should lex self closing tag', () => {
      const lexer = new JsxLexer('<Ui/>');
      lexer.next().type.should.equal('startTag');
      lexer.next().type.should.equal('endTag');
    });
    it('should ignore whitespace', () => {
      const lexer = new JsxLexer('<Ui> <Ui>');
      lexer.next().type.should.equal('startTag');
      lexer.next().type.should.equal('startTag');
    });
    it('should parse text child', () => {
      const lexer = new JsxLexer('<Ui>Hi!</Ui>');
      lexer.next().type.should.equal('startTag');
      lexer.next().type.should.equal('text');
      lexer.next().type.should.equal('endTag');
    });
  });
});
