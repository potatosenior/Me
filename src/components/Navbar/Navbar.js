import React, {useState} from 'react';

import theme from '../../utils/theme'
import './navbar.css';
import MobileList from './MobileList';


function Navbar(props) {
  const [shownMobileList, setShownMobileList] = useState(false);

  return (
    <div style={styles.fundo} >
      <div style={{...styles.container, backgroundColor: theme[props.theme].primary}} className="navbar" >
        <h1 style={styles.h1} onClick={() => window.scrollTo(0,0)} >João Pedro de Oliveira</h1>
        
        <div style={styles.ul} className="list">
          <span style={styles.li} onClick={() => window.location.href='#AboutMe'} >
            Sobre
          </span>
          <span style={styles.bar} />
          <span style={styles.li} onClick={() => window.location.href='#Skills'} >
            Skills
          </span>
          <span style={styles.bar} />
          <span style={styles.li} onClick={() => window.location.href='#Projects'} >
            Projetos
          </span>
          <span style={styles.bar} />
          <span style={styles.li} onClick={() => window.location.href='#Contact'} >
            Contato
          </span>
        </div>
        
        <div className="mobile-button" style={styles.menu} onClick={() => setShownMobileList(!shownMobileList)} >
          <div style={styles.menuBar} />
          <div style={styles.menuBar} />
          <div style={styles.menuBar} />
        </div>
      </div>

      <MobileList theme={props.theme} shown={shownMobileList} />
      
    </div>
  );
}

const styles = {
  fundo: {
    position: 'fixed',
    width: '100%',
    // height: '20%',
    color: 'white',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    width: '100%',
    display: 'flex', 
    flexDirection: 'auto', 
    backgroundColor: 'blue',
    justifyContent: 'space-between',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  h1: {
    textAlign: 'center',
    marginLeft: '4%',
    color: 'white',
    fontSize: '2rem',
    fontFamily: ['Great Vibes', 'cursive'],
    cursor: 'pointer'
  },
  ul: {
    width: '40%', 
    listStyleType: 'none',
    display: 'auto',
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: '2%'
  },
  li: {
    display: 'flex',
    width: '20%', 
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    /* boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',*/
    borderColor: 'white',
    borderRightWidth: 5, 
    //backgroundColor: 'green',
  },
  bar: {
    height: '50%',
    width: '1px',
    backgroundColor: '#fff'
  },
  menu: {
    display: 'auto',
    flexDirection: 'column',
    width: '35px',
    height: '30px',
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    alignSelf: 'center',
    marginRight: '1.5rem'
  },
  menuBar: {
    height: '2px',
    width: '100%',
    backgroundColor: 'white',
  }
}

export default Navbar;