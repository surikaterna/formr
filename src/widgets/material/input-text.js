import React from 'react';
import BaseInput from './base-input';

export default function InputText(props) {
  console.log(props);
  return <BaseInput {...props} type="text" />;
}
