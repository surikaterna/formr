import React from 'react';
import TextField from 'material-ui/TextField';

export default function BaseInput(props) {

  const {value, onChange,
    $componentFactory,
    $schema,
    $root,
    $this,
    ...other
  } = props;
  return <TextField {...other} value={value} onChange={(e) => onChange(e.target.value) } floatingLabelText={props.title} errorText={props.errorText}/>
};
