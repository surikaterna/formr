import React from 'react';
import LayoutField from './layout-field';

/**
 *  Represents a data bound field in the model
 */
const Field = props =>
  <LayoutField {...props}>
    {props.children}
  </LayoutField>;

export default Field;
