import React from 'react';

import theme from '../../utils/theme'
import Bar from '../bar';
// import './Projects.css';

function Projects(props) {
  const styleCategoryContainer = Object.assign({}, styles.categoryContainer, {backgroundColor: theme[props.theme].third})
  const styleA = Object.assign({}, styles.a, {color: theme[props.theme].fourth})

  return (
    <>
    <div style={styles.container} id="Projects" >
      <h1>Meus projetos</h1>
      <div style={{display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'center'}} >
        <h2 style={{alignSelf: 'flex-start'}} >Aplicativos</h2>
        <div style={styleCategoryContainer} >
          <h3>
            <a href="https://play.google.com/store/apps/details?id=com.potatosenior.roleudi" style={styleA} >
              Role Udi
              <i style={{fontSize: '20px', marginLeft: '10px'}} class="fa">&#xf08e;</i>
            </a>
          </h3>
          <div style={styles.projectContainer} className="projectContainer" >
            <p style={styles.p} >Role Udi é um aplicativo mobile desenvolvido com a finalidade de divulgar festas e eventos em Uberlândia.</p>
            <img 
              src={process.env.PUBLIC_URL + "/roleudi.png"}
              alt="logo"
              height="100px"
              width="100px"
              style={styles.projectImg}
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.potatosenior.roleudi")}
            />
          </div>
          <h3>
            <a href="https://play.google.com/store/apps/details?id=com.potatosenior.contadortento" style={styleA} >
              Contador de tento
              <i style={{fontSize: '20px', marginLeft: '10px'}} class="fa">&#xf08e;</i>
            </a>
          </h3>
          <div style={styles.projectContainer} className="projectContainer" >
            <p style={styles.p} >Contador de tento é um aplicativo mobile desenvolvido com a finalidade de marcar os pontos em partidas de Truco ou qualquer outro jogo
              similar.</p>
            <img 
              src={process.env.PUBLIC_URL + "/contador.png"} 
              alt="logo"
              height="100px"
              width="100px"
              style={styles.projectImg}
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.potatosenior.contadortento")}
            />
          </div>
        </div>

        <h2 style={{alignSelf: 'flex-start'}} >Bots</h2>
        <div style={styleCategoryContainer} >
          <h3>
            <a href="https://twitter.com/50centEmBonoros" style={styleA} >
              50cent em reais
              <i style={{fontSize: '20px', marginLeft: '10px'}} class="fa">&#xf08e;</i>
            </a>
          </h3>
          <div style={styles.projectContainer} className="projectContainer" >
            <p style={styles.p} >50cent em reais é um bot do <a style={styleA} href="https://twitter.com/home">twitter</a> que publica todo dia a 
            cotação de 50 centavos de dólar em reais com uma foto do rapper 50cent.</p>
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwdjI0aDI0di0yNGgtMjR6bTE4Ljg2MiA5LjIzN2MuMjA4IDQuNjE3LTMuMjM1IDkuNzY1LTkuMzMgOS43NjUtMS44NTQgMC0zLjU3OS0uNTQzLTUuMDMyLTEuNDc1IDEuNzQyLjIwNSAzLjQ4LS4yNzggNC44Ni0xLjM1OS0xLjQzNy0uMDI3LTIuNjQ5LS45NzYtMy4wNjYtMi4yOC41MTUuMDk4IDEuMDIxLjA2OSAxLjQ4Mi0uMDU2LTEuNTc5LS4zMTctMi42NjgtMS43MzktMi42MzMtMy4yNi40NDIuMjQ2Ljk0OS4zOTQgMS40ODYuNDExLTEuNDYxLS45NzctMS44NzUtMi45MDctMS4wMTYtNC4zODMgMS42MTkgMS45ODYgNC4wMzggMy4yOTMgNi43NjYgMy40My0uNDc5LTIuMDUzIDEuMDc5LTQuMDMgMy4xOTgtNC4wMy45NDQgMCAxLjc5Ny4zOTggMi4zOTYgMS4wMzcuNzQ4LS4xNDcgMS40NTEtLjQyIDIuMDg1LS43OTYtLjI0NS43NjctLjc2NiAxLjQxLTEuNDQzIDEuODE2LjY2NC0uMDggMS4yOTctLjI1NiAxLjg4NS0uNTE3LS40NC42NTYtLjk5NyAxLjIzNC0xLjYzOCAxLjY5N3oiLz48L3N2Zz4="
              alt="logo"
              height="100px"
              width="100px"
              style={{...styles.projectImg, backgroundColor: theme[props.theme].fourth}}
              onClick={() => window.open("https://twitter.com/50centEmBonoros")}
            />
          </div>
        </div>
      </div>
    </div>
    <Bar theme={props.theme} />
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', 
    color: 'white',
    alignItems: 'center',
    padding: '1rem',
    justifyContent: 'center',
  },
  categoryContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    width: '95%',
    padding: '1.5rem',
    boxShadow: '1px 1px 10px 6px rgba(0,0,0,0.45)',
    borderRadius: '1rem',
    alignItems: 'center'
  },
  projectContainer: {
    display: 'flex', 
    flexDirection: 'column-reverse', 
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-between',
    // backgroundColor: 'green'
  },
  projectImg: {
    borderRadius: '1rem', 
    boxShadow: "9px 5px 8px 0px rgba(0,0,0,0.5)",
    cursor: 'pointer',
    alignSelf: 'center'
  },
  p: {
    width: "100%",
    textAlign: 'justify',
  },
  a: {
    textDecoration: 'none',
    //color: 'white'
  }
}
export default Projects;