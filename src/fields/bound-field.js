import React from 'react';

const BoundField = Field => function BoundField(props) {
  return <div style={{backgroundColor:'green'}}><Field {...props} value={props.value.get()} onChange={(v) => props.onChange({name: v})}/></div>;
};

export default BoundField;
