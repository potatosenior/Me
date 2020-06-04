import React from 'react';

import theme from '../utils/theme'

const Bar = (props) => {
  return (
    <span style={{display: 'flex', backgroundColor: theme[props.theme].third, width: "90%", height: '0.1rem', alignSelf: 'center'}} />
  )
}

export default Bar;