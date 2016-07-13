import React, { Component } from 'react';
import Form from './form';
import Expr from './expression';
import Ui from './ui';
import ModelField from './fields/model-field';

import JsxParser from './core/jsx/parser';
const parser = new JsxParser();


//<Import name='/asdda/aasd/asd/asd'>

//<Component name="OrderLine">
//</Component>

/*
Json:
 { arr: [{id: 123, age:234}]}
<Panel>
  <ModelField value='ass'/>
  <ModelField value='ass'/>
  <ModelField value=''/>
  <Repeat value='array' var='item'>
    <ModelField value={this.item.gonzoles}' />
    <ModelField value={this.items.age} />
    <Button aloha/>
  </Repeat>
</Panel>
 */
/*
<Grid>
  <Row>
    <Cell xs="12" lg="1">
      <ModelField value={item.age} />
    </Cell>
  </Row>
</Grid>
*/
/*
 { type:'Grid'
  props: {

    children: [{}]
  }}
  */
const jsx = `
  <Ui>
    <ModelField value={name} schema={{ type:"string", "title":"Name"}}/>
    <ModelField value={name} schema={{ type:"string", "title":"Name"}}/>
    <ModelField value={age} schema={{ type:"number", "title":"Name"}}/>
    <ModelField value={age} schema={{ type:"number", "title":"Name"}}/>
  </Ui>
`

const uiDef = parser.parse(jsx).props.children;

const modelValue = {
  name: 'Bertil',
  age: 12
}

function resolver(x) {
  return factories[x.type];
}
const factories = {
  'InputText': props => <input type="text" {...props}></input>,
  'InputNumber': props => <input type="number" {...props}></input>,
  'Grid': props => <b>Grid</b>,
  'Cell': props => <b>Cell</b>,
  'ForEach': props => props.value.map(x => x),
  ModelField
};
const ComponentFactory = (name) => {
  let component = factories[name];
  if (!component) {
    component = x => <span>Uh oh!No factory found for component type <em>{name}</em></span>
  }
  return component;
}

const FormField = props => { const C = ComponentFactory(props.name, props); return <C {...props}/> };
const data = {
  name: 'Andreas'
}
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' }
  }
}

export default class App extends Component {
  render() {
    /*<Form form={uiDef} resolver={x=>resolver(x)} data={data} factory={ComponentFactory} />*/
    return (
      <div>
        <h1>JSX</h1>
        <Ui ui={uiDef} value={modelValue} onChange={(val) => { console.log(val) } } componentFactory={ComponentFactory}/>
      </div>
    );
  }
}
/*
 Form iterates through tree, resolves all children to react components
 and then puts it back again
 Field(value=obj, schema=valueSchema)
 * Resolve subtree
 */
