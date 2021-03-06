import React from 'react';
import Schema from '../schema';
import ModelField from './model-field';
import LayoutField from './layout-field';

export default function SchemaObject(props) {
  const schema = props.$formr.schema;

  if (!schema.isObject()) {
    throw new Error(`SchemaObject created for type: ${schema.getType()}`);
  }
  const {errorText, ...rest} = props;
  console.log(errorText, rest);
  const schemaProps = schema.getProperties();
  const fields = Object.keys(schemaProps).map(p =>
    <ModelField {...rest} key={p} title={schema.getSchema(p).getTitle()} value={props.value[p]} $formr={Object.assign({}, props.$formr, { schema: schema.getSchema(p) })}
      onChange={(e) => props.onChange(Object.assign({}, props.value, { [p]: e }))} />
  );

  return <div>{fields}</div>;
}
