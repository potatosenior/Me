import React from 'react';

import theme from '../utils/theme'

function Footer(props) {

  const liStyle = Object.assign({}, styles.li)
  return (
    <div style={{...styles.container, backgroundColor: theme[props.theme].third}} >
      <p style={styles.p} >© MIT</p>
      <ul style={styles.ul} >
        <li style={liStyle} >
          <a style={styles.a} href="https://www.github.com/potatosenior">
            github
          </a>
        </li>
        <li style={liStyle}>
          <a style={styles.a} href="https://www.linkedin.com/in/joãopedrovieira/">
            linkedin
          </a>
        </li>
        <li style={liStyle}>
          <a style={styles.a} href="https://play.google.com/store/apps/developer?id=Potatosenior">
            plasytore
          </a>
        </li>
        <li style={liStyle}>
          <a style={styles.a} href="https://api.whatsapp.com/send?phone=5564992432941&text=Olá&source=&data=&app_absent=">
            contato
          </a>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', 
    flexDirection: 'column', 
    color: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  p: {
    alignSelf: 'center'
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  li: {
    display: 'flex',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'black',
    //boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  a: {
    textDecoration: 'none',
    color: 'white'
  }
}

export default Footer;