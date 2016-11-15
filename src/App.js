import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ModelField from './fields/model-field';
import Field from './fields/field';
import SchemaObject from './fields/schema-object';
import Ui from './ui';
import JsxParser from './core/jsx/parser';

import InputText from './widgets/material/input-text';
import InputNumber from './widgets/material/input-number';

import Grid from './widgets/pure/grid';
import { Cell } from 'react-pure';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
import Schema from './schema';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
if (!global.boot) {
  injectTapEventPlugin();
  global.boot = true;
}

const parser = new JsxParser();

console.log('React version', React.version);

//<Import name='/asdda/aasd/asd/asd'>

//<Component name="OrderLine">
//</Component>

/*
When someone does a ref in the schema matching below (maybe always do a match check?)
  <Component match="/definitions/...../" id="MyComponentName">
    <Panel title="Aloha">
      <FieldContainer>
        <ModelField.../>
        <ModelField.../>
        <ModelField.../>
        <ModelField.../>
        <ModelField.../>
        <ModelField.../>
        <ModelField.../>
      </FieldContainer>
    </Panel>
  </Component>
*/
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
  Grid: () => Grid,
  Cell: () => <b>Cell</b>,
  ForEach: props => props.value.map(x => x),
  ModelField: { component: ModelField, options: { includeRootProperties: true } },
  SchemaObject
};

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

// const uiDef = parser.parse(jsx);

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
    name: { type: 'string', title: 'Name', format: 'email' },
    age: { type: 'number' },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string', format: 'email' },
        streetNumber: { type: 'number', minimum: 1, exclusiveMinimum: true },
        street2: {
          type: 'string', pattern: '^[^/]*$',
          minLength: 2
        },
        street3: { type: 'string' },
        color: {
          type: 'string',
          enum: ['red', 'amber', 'green'],
          title: 'Färgen',
          description: 'Ange en färg som du gillar'
        }
      }
    }
  }
};

const Json = (props) =>
  <div><pre>{JSON.stringify(props.value, null, 2)}</pre></div>;



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data, jsx, schema: JSON.stringify(schema, null, 4) };
  }
  render() {
    const uiDef = parser.parse(this.state.jsx);
    let schemaDef = {};
    try {
      schemaDef = JSON.parse(this.state.schema);
    } catch (e) {
      schemaDef = schema;
    }

    return (
      <MuiThemeProvider>
        <div>
          A{this.state.nr}B
          <Ui ui={uiDef} componentFactory={ComponentFactory} schema={schemaDef} value={this.state.data} onChange={(e) => { this.setState({ data: e }); } } />
          <Grid>
            <Field size="xl">
              <Json value={this.state.data} />
            </Field>
            <Field size="xl">
              <TextField style={{ fontFamily: 'Courier New', fontSize: 11 }} multiLine={true} rows={5} value={this.state.jsx} fullWidth={true} floatingLabelText="jsx" onChange={(e) => this.setState({ jsx: e.target.value })} />
            </Field>
            <Field size="xl">
              <TextField style={{ fontFamily: 'Courier New', fontSize: 11 }} multiLine={true} rows={5} value={this.state.schema} fullWidth={true} floatingLabelText="schema" onChange={(e) => this.setState({ schema: e.target.value })} />
            </Field>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

/*
          <Grid>
            <Field size="md">
              <InputText value="ABBA 210" />
            </Field>
            <Field>
              <InputText value="ABBA 2" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 3" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 4" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 5" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 6" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 7" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 8" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 9" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 10" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 11" />
            </Field>
            <Field size="md">
              <InputText value="ABBA 12" />
            </Field>
          </Grid>
          */
