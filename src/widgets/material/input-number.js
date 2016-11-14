import React from 'react';
import BaseInput from './base-input';

export default function InputNumber(props) {
  return <BaseInput {...props} type="number" onChange={(e) => props.onChange(Number(e))} />;
}
