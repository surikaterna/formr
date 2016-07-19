import React from 'react';

const BoundField = Field => props =>
  <Field {...props} value={props.value.get() } onChange={(v) => props.onChange(props.value.set(v)) }/>;

export default BoundField;
