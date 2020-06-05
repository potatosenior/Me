import React from 'react';

import theme from '../../utils/theme'

const MobileList = (props) => {
  const barra = Object.assign({}, styles.barra, {backgroundColor: theme[props.theme].fourth});
  const container = Object.assign(
    {},
    styles.container,
    {
      backgroundColor: theme[props.theme].third, 
      display: props.shown ? 'flex' : 'none'
    },
    props.shown ? {transform: 'translateY(0rem)'} : {transform: 'translateY(0rem)'}
  );
  return (
    <>
    <div 
      style={container} 
      className="list-mobile"
    >
      <li style={styles.item} onClick={() => window.location.href='#AboutMe'} >
        Sobre
      </li>
      <span style={barra} />
      <li style={styles.item} onClick={() => window.location.href='#Skills'} >
        Skills
      </li>
      <span style={barra} />
      <li style={styles.item} onClick={() => window.location.href='#Projects'}>
        Projetos
      </li>
      <span style={barra} />
      <li style={styles.item} onClick={() => window.location.href='#Contact'} >
        Contato
      </li>
    </div>

    <span style={{...styles.barra, width: '100%', height: '1px'}} />
    </>
  )
}
const styles = {
  container: {
    display: 'auto',
    listStyleType: 'none',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: '3%',
    paddingBottom: '3%',
    height: '15rem',
    alignItems: 'center',
    // transition: '2s ease 2s',
  },
  item: {
    textAlign: 'center',
    cursor: 'pointer',
  },
  barra: {
    width: '90%',
    height: '3px',
    backgroundColor: '#fff',
    // marginRight: '10%'
  },

}
export default MobileList;