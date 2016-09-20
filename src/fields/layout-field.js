const sizes = {
  xs: {
    size: '1/2',
    sm: '1/8',
    md: '1/24',
    xl: '1/24'
  },
  sm: {
    size: '1',
    sm: '1/4',
    md: '2/24',
    xl: '1/24'
  },
  md: {
    size: '1',
    sm: '1/2',
    md: '4/24',
    xl: '2/24'
  },
  lg: {
    size: '1',
    sm: '1',
    md: '12/24',
    xl: '8/24'
  },
  xl: {
    size: '1',
    sm: '1',
    md: '1',
    xl: '12/24'
  }
};

const LayoutField = props => {
  let {size, ...rest} = props;
  if(!size) {
    size = 'md';
  }

  const sizeProps = sizes[size];
  <Cell {...rest} {...sizeProps}/>;
}

export default LayoutField;
