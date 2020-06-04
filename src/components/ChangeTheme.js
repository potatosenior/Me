import React from 'react';

import theme from '../utils/theme'

const ChangeTheme = (props) => {
  return (
    <div style={{...styles.container, backgroundColor: theme[props.theme].third}}>
      <label 
        for="changeTheme" 
        style={{...styles.themeChange, backgroundColor: theme[props.theme].primary}} 
      >
        <input 
          type="checkbox" id="changeTheme" style={{opacity: "0%", width: 0, height: 0}} 
          onChange={() => props.theme === 'light' ? props.setTheme('dark') : props.setTheme('light')} 
        />
        <span style={{...styles.slider, ...props.theme === 'dark' ? {transform: 'translateX(1.5rem)'} : null}} />
      </label>
      <p style={styles.p} > Mudar tema</p>
    </div>
  )
}
const styles = {
  container: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'fixed', 
    bottom: "15%", 
    right: 20,
    borderRadius: 10,
    padding: '0px 10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  themeChange: {
    width: '3.1rem',
    height: '1.6rem',
    color: 'transparent',
    backgroundColor: '#89c12d',
    borderRadius: 20,
    position: 'relative',
    marginRight: 10
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: '0.1rem',
    left: '0.1rem',
    backgroundColor: '#fff',
    height: '1.4rem',
    width: '1.4rem',
    borderRadius: 13,
    transition: '.4s',
    '-webkit-transition': '.4s',
  },
  p: {
    color: 'white',

  }
}
export default ChangeTheme;

