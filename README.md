# formr
Declarative UI in react...

This library was created to have a fairly simple but still highly customized way of creating UI's in declaratively.
"Design Goals":
+ Use JSON-schema to describe data model and automatically do form building and validation
+ Use "JSX like" syntax to template views
+ Have little overhead from template to regular React.createElement
+ Easy plug and play between template language and general React components
+ Support different rendering backends such as bootstrap or material-ui

## Example
### Schema
```javascript
{
  type: 'object',
  properties: {
    name: {type: 'string'}
    age: {type: 'number'}
  }
}
```
### UI definition (as a string)
```jsx
<div>
  <ModelField value={name}/>
  <ModelField value={age}/>
</div>
```

```jsx
  <Ui schema={schema} ui={ui} componentFactory={cf} />
```
# Architecture
## Flow
### core/jsx
Used to to parse jsx as a string and return an object version which fairly closely match reacts model.
### ElementBuilder
Takes object (ui-definition) that was given from jsx parser and build react element structure with
React.createElement.
Responsible for:
- convert `<div>` to React html element
- convert `<ComponentName>` to corresponding React element but resolving **ComponentName** to real React component class or pure function
- Has some additional features to enable complex use casese such as creating Repeaters, inline Components
### Fields
Maps/binds between data-model and UI
- ModelField - Used to resolve which type of input is necessary to edit current model
- BoundField - If props.value is an expression for a ModelField, BoundField converts between expression and real value for underlying Widget

### Widgets
Responsible for rendering actual GUI
Standard Widgets:
- [x] InputText
- [x] InputNumber
- [ ] InputDate
- [ ] InputXYZ

## Component Library
TBD

# Supported features
## JSX
- [x] `<Object>` - Support Component tags
- [x] `<htmlTag>` - Support HTML tags
- [x] `<SelfClosing />` - Support tags that are self closing
- [x] `<Object attribute="value" />` - support attributes
- [x] `<Object attribute={1+1} />` - support expression attributes
- [x] `<div>Text\</div` - support text children
- [ ] `<div>{expression}</div>` - support expression children
- [ ] `<div {...object}></div>` - support spread attribute

## ElementBuilder
- [x] Build html elmeent
- [x] Build react component
- [ ] Execute expression and put in props for component
- [ ] Override so children is not created
- [ ] Support in template defined Components

## JSON schema
### Types
- [ ] type object
- [ ] type string
- [ ] type number
- [ ] enum
- [ ] allOf
- [ ] oneOf
- [ ] anyOf
- [ ] not
- [ ] $ref
- [ ] $data

### Formats
- [x] format e-mail
- [ ] format regexp

### Other
- [ ] required
- [ ] minItems
- [ ] maxItems
- [ ] minProperties
- [ ] maxProperties

