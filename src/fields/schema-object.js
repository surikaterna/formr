import React from 'react';
import Schema from '../schema';
import ModelField from './model-field';
import LayoutField from './layout-field';

export default function SchemaObject(props) {
  const schema = props.$formr.schema;

  if (!schema.isObject()) {
    throw new Error(`SchemaObject created for type: ${schema.getType()}`);
  }
  // do not propagate error on object level downn to all children
  const {errorText, ...rest} = props;
  const schemaProps = schema.getProperties();
  const fields = Object.keys(schemaProps).map(p => {
    const fieldSchema = schema.getSchema(p);
    return <ModelField {...rest} key={p} 
      title={fieldSchema.getTitle()} 
      description={fieldSchema.getDescription()} 
      value={props.value[p]} 
      $formr={Object.assign({}, props.$formr, { schema: fieldSchema })}
      onChange={(e) => props.onChange(Object.assign({}, props.value, { [p]: e }))} />
    }
  );

  return <div>{fields}</div>;
}
