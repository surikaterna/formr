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



// if props.type = 'function' use it as widget
PatternService.addProvider((schema, props) => (props.type && typeof (props.type) === 'function') ? props.type : undefined);

const _componentConverter = {
  string: 'InputText',
  number: 'InputNumber',
  object: 'SchemaObject',
  array: 'SchemaArray'
};

const _getWidgetFromType = (type) => {
  const fieldType = _componentConverter[type] || type;
  return this.props.$formr.componentFactory(fieldType);
}

// if props.type = 'json-schema-type' resolve to correct component type
PatternService.addProvider((schema, props) => (props.type && typeof (props.type) === 'string') ? _getWidgetFromType(props.type));