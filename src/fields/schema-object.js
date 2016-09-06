import React from 'react';
import Schema from '../schema';
import ModelField from './model-field';

export default function SchemaObject(props) {
  console.log('SC', props);
  const schema = new Schema(props.$schema);
  if (!schema.isObject()) {
    throw new Error(`SchemaObject created for type: ${schema.getType()}`);
  }
  const schemaProps = schema.getProperties();
  console.log('pp', schemaProps);
  const fields = Object.keys(schemaProps).map(p =>
    <ModelField {...props} value={props.value[p]} type={schema.getType(p)} $schema={schema.getSchema(p).asJson()}
      onChange={(e) => props.onChange(Object.assign({}, props.value, { [p]: e })) } />
  );
  return <div>{fields}</div>;
}
