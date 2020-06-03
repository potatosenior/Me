import React from 'react';

import theme from '../utils/theme'

function Navbar(props) {
  console.log(theme)

  const liStyle = Object.assign({}, styles.li, {backgroundColor: theme[props.theme].secondary})

  return (
    <div style={{...styles.container, backgroundColor: theme[props.theme].primary}} >
      <h1 style={styles.h1} >Joaozin Empurra Nelas</h1>
      <div 
        style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }} 
      >
        <label for="changeTheme" 
          style={{...styles.themeCBLight, ...props.theme === 'light' ? {backgroundColor: theme[props.theme].secondary} : {backgroundColor: theme[props.theme].secondary}}} 
        >
          <input 
            type="checkbox" id="changeTheme" style={{opacity: "0%", width: 0, height: 0}} 
            onChange={() => props.theme === 'light' ? props.setTheme('dark') : props.setTheme('light')} 
          />
          <span style={{...styles.sliderLight, ...props.theme === 'dark' ? {transform: 'translateX(1.5rem)'} : null}} />
        </label>
        <p style={{ position: 'relative', bottom: "40%"}} >Mudar para tema {props.theme === 'light' ? 'escuro' : 'claro'}</p>
      </div>
      <ul style={styles.ul} >
        <li style={liStyle} >
          Sobre
        </li>
        <li style={liStyle}>
          Skills
        </li>
        <li style={liStyle}>
          Projetos
        </li>
        <li style={liStyle}>
          Contato
        </li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', 
    flexDirection: 'row', 
    backgroundColor: 'blue',
    justifyContent: 'space-between',
    color: 'white'
  },
  h1: {
    textAlign: 'center',
    marginLeft: '4%',
    color: 'white'
  },
  themeCBLight: {
    width: '3.1rem',
    height: '1.6rem',
    color: 'transparent',
    backgroundColor: '#89c12d',
    borderRadius: 20,
    position: 'relative',
    top: '2rem'
  },
  sliderLight: {
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
  ul: {
    width: '40%', 
    listStyleType: 'none',
    display: 'flex',
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: '2%'
  },
  li: {
    display: 'flex',
    width: '20%', 
    height: '80%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: 5,
    borderBottomRightRadius: 20,
    cursor: 'pointer',
  }
}

export default Navbar;