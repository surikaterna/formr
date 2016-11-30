class PatternService {
  constructor() {
    this._providers = [];
  }
  addProvider(provider) {
    this._push(provider);
  }
  getWidget(schema, fieldProps) {
    for (let i = 0; i < this._providers.length; i++) {
      const widget = this._providers[i](schema, fieldProps);
      if (widget) {
        return widget;
      }
    }
    throw new Error('Unable to resolve Widget for type', schema);
  }
}

export const service = new PatternService();





// if props.type = 'function' use it as widget
service.addProvider((schema, props) => (props.type && typeof (props.type) === 'function') ? props.type : undefined);

const _componentConverter = {
  string: 'InputText',
  number: 'InputNumber',
  object: 'SchemaObject',
  array: 'SchemaArray'
};

const _getWidgetFromType = (type) => {
  const fieldType = _componentConverter[type] || type;
  return this.props.$formr.componentFactory(fieldType);
};

// if props.type = 'json-schema-type' resolve to correct component type
service.addProvider((schema, props) => (props.type && typeof (props.type) === 'string') ? _getWidgetFromType(props.type) : undefined);

  /**
   * if props.type = 'function' use it as widget
   * if props.type = 'json-schema-type' resolve to correct component type
   * else if props.type = 'component-type' resolve component
   *
   * USER DEFINED PROVIDERS ??
   * <Component id='Aloha' matches={$ref:'#/definitions/orders/test'}>
   *  <div>Hello World!</div>
   * </Component>
   * <Aloha value={'adsasdsd'} />
   *
   * else if no props.type but props.value is an expression,
   * take path from expression and resolve the corresponding type from schema
   * else use type = string
   *
   */
