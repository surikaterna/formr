import React from 'react';

/**
 * BoundField act as a bridge between a {expression} and the regular react widgets
 */
const BoundField = Field => props =>
  <Field {...props} value={props.value.get() } onChange={(v) => props.onChange(props.value.set(v)) }/>;

export default BoundField;
