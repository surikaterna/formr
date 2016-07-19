import React from 'react';

export default function BaseInput(props) {

  const {value, onChange,
    $componentFactory,
    $schema,
    $root,
    $this,
    ...other
} = props;
return <input {...other} value={value} onChange={(e) => onChange(e.target.value) }/>
}
