import React, { Component } from 'react';
import Expression, { Evaluator } from './expression';
import ElementBuilder from './core/element-builder';
import Schema from './schema';
const wrapChildren = (children, props) =>
  React.Children.map(children, (child) => React.cloneElement(child, props));

const Grid = (props) => <div class="grid">{wrapChildren(props.children, props)}</div>;

class PropertyExpander {
  static expand(props, context, evaluator) {
    const result = {};
    for (const key in props) {
      let val = props[key];
      console.log(key, val);
      if (val instanceof Expression) {
        val = evaluator.eval(val, context);
      }
      result[key] = val;
    }
    return result;
  }
}
/*
  <Component id='Asdasd'>
    <div>Aloha</div>
  </Component>
  <Asdasd>
  </Asdasd>
*/

export default class DeclaredUi extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const {ui, componentFactory, onChange, schema, ...other} = this.props;
    const builder = new ElementBuilder(componentFactory);
    //    var i =0;
    /*    const result = this.props.ui.map(c => {
          // go for expressions
          let componentProps = PropertyExpander.expand(c.props, other['value'], new Evaluator());
          //const componentProps = PropertyExpander.expand(Object.assign({}, other, c.props), new Evaluator());
          componentProps = Object.assign({}, other, componentProps);
          const Field = componentFactory(c.type);
          //const Field = BoundField(component);
          //const Field = props => <b>Test</b>;
          return <Field key={i++} onChange={e=>console.log(e)} {...componentProps } componentFactory={componentFactory}/>;
        });
    */
    const result = builder.build(ui, { onChange }, { componentFactory, schema: new Schema(schema), root: this.props.value, this: this.props.value });
    return <div className="ui">{result}</div>
  }
}

