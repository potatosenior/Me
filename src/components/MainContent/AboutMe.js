import React from 'react';

import theme from '../../utils/theme'
import Bar from '../bar';
import './AboutMe.css';

function AboutMe(props) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}} id="AboutMe" >
      <div style={{...styles.container}} className="aboutMeContainer"  >
        <img src={process.env.PUBLIC_URL + "/eu.jpg"} alt="eu ae" style={styles.image} />
        <div style={{display: 'flex', flexDirection: 'column', width: '75%'}} >
          <h1>Sobre mim</h1>
          <p style={styles.text} >
            {/* Doutorado em Truco com especialização em pedir truco com família real, doutorado em sinuca com especialização em matar o bolão, e cursando pós-doutorado em ambos. */}
            Bom, pra começar meu nome é João Pedro de Oliveira, design não é meu forte, eu gosto de desenvolver aplicativos e pensar em soluções pra tudo ao meu redor, 
            seja algo cotidiano ou mais complexo, tento imaginar um algoritmo ou um aplicativo que possa fazer a ação ou auxiliar.
            Atualmente sou bacharelando em Ciência da Computação pela <a 
            style={{textDecoration: 'none', color: theme[props.theme].fourth}} href="http://www.ufu.br" >
              Universidade Federal de Uberlândia
            </a>.
          </p>
        </div>
      </div>
      <Bar theme={props.theme} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'auto', 
    color: 'white',
    alignItems: 'center',
    //backgroundColor: 'red',
    marginTop: '10rem',
    justifyContent: 'space-around',
    padding: '1rem'
  },
  image: {
    display: 'flex',
    width: '15rem',
    height: '15rem',
    overflow: 'hidden',
    borderRadius: '50%',
    border: '0.2rem solid white',
  },
  text: {
    /* fontSize: '1.2rem', */
  }
}
export default AboutMe;