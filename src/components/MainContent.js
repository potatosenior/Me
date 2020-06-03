import React from 'react';

import theme from '../utils/theme'

function MainContent(props) {
  return (
    <div style={{...styles.container, backgroundColor: theme[props.theme].secondary}} >
      aaa
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', 
    color: 'white',
    width: '100%',
    height: '200%'
  },
}
export default MainContent;