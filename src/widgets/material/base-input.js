import React from 'react';
import TextField from 'material-ui/TextField';

export default function BaseInput(props) {

  const {value, onChange,
    $formr,
    description,
    ...other,
  } = props;
return <TextField {...other} fullWidth={true} value={value || ''}
  onChange={(e) => onChange(e.target.value)}
  floatingLabelText={props.title}
  hintText={description || props.title}
  errorText={props.errorText}
  />
};
