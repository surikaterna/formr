export default (schema, props) =>
  ((props.type && typeof (props.type) === 'function') ? props.type : undefined);
