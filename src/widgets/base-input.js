import React from 'react';

/**
 * className
 * defaultValue
 * disabled
 * errorText
 * title
 * description
 * type
 */
export default function BaseInput(props) {

  const {value, onChange,
    $componentFactory,
    $schema,
    $root,
    $this,
    ...other
  } = props;
  return <input {...other} value={value} onChange={(e) => onChange(e.target.value) }/>
};
