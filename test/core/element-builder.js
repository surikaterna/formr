import React from 'react';
import should from 'should';
import JsxParser from '../../src/core/jsx/parser';
import ElementBuilder from '../../src/core/element-builder';

describe('ElementBuilder', () => {
  describe('#build', () => {
    it('should return element for simple JSX', () => {
      const parser = new JsxParser();
      const builder = new ElementBuilder();
      const res = builder.build(parser.parse('<b><i><Grid/></i></b>'));
      res.type.should.equal('b');
    });
    it('should handle text child', () => {
      const parser = new JsxParser();
      const builder = new ElementBuilder();
      const res = builder.build(parser.parse('<b>Hej</b>'));
      res.props.children.should.equal('Hej');
    });
    it('should handle default props', () => {
      const parser = new JsxParser();
      const builder = new ElementBuilder(() => () => <div></div>);
      const res = builder.build(parser.parse('<B>Hej</B>'), { a: 1 });
      res.props.a.should.equal(1);
    });
    it('should pass default props to children', () => {
      const parser = new JsxParser();
      const builder = new ElementBuilder(() => () => <div></div>);
      const res = builder.build(parser.parse('<b><I>Hej</I></b>'), { a: 1 });
      res.props.children.props.a.should.equal(1);
    });
  });
});
