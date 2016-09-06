import React, { Component } from 'react';

import ModelField from './fields/model-field';
import SchemaObject from './fields/schema-object';
import Ui from './ui';
import JsxParser from './core/jsx/parser';

import InputText from './widgets/input-text';
import InputNumber from './widgets/input-number';

const parser = new JsxParser();

console.log('React version', React.version);
const BoundField2 = Field => function BoundField2(props) {
  return <div style={{ 'backgroundColor': 'red' }}><Field {...props}/></div >
}



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
/*const jsx = `
  <Ui>
    <ModelField value={name} schema={{ type:"string", "title":"Name"}}/>
    <ModelField value={name} schema={{ type:"string", "title":"Name"}}/>
    <ModelField value={age} schema={{ type:"number", "title":"Name"}}/>
    <ModelField value={age} schema={{ type:"number", "title":"Name"}}/>
  </Ui>
`*/


const factories = {
  InputText,
  InputNumber,
  Grid: () => <b>Grid</b>,
  Cell: () => <b>Cell</b>,
  ForEach: props => props.value.map(x => x),
  ModelField: { component: ModelField, options: { includeRootProperties: true } },
  SchemaObject
};

const InputText2 = BoundField2(InputText);

const ComponentFactory = (name) => {
  if (!name || !name.length) {
    throw new Error('cf');
  }
  let component = factories[name];
  if (!component) {
    component = () => <span style={{ color: 'red' }}>No factory found for component type <em>{name}</em></span>;
  }
  return component;
};

const jsx = `
  <div style={{backgroundColor:'pink'}}>
    <ModelField value={name}/>
    <ModelField value={age}/>
    <ModelField value={address}/>
  </div>`;

const uiDef = parser.parse(jsx);

const data = {
  name: 'Andreas',
  age: 12,
  address: {
    street: 'Bell Man Street',
    streetNumber: 2
  }
};

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        streetNumber: { type: 'number' }
      }
    }
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
  }
  render() {
    return (
      <div>
        <h1>JSX</h1>
        <Ui ui={uiDef} value={this.state} onChange={(value) => this.setState(value) } componentFactory={ComponentFactory} schema={schema}/>
        <span>{this.state.address.street}</span>
      </div>
    );
  }
}
