import React from 'react';

import theme from '../../utils/theme'
// import './Contact.css'

function Contact(props) {
  const styleCategoryContainer = Object.assign({}, styles.categoryContainer, {backgroundColor: theme[props.theme].third})
  const styleA = Object.assign({}, styles.a, {color: theme[props.theme].fourth})
  const styleImg = Object.assign({}, styles.projectImg, {backgroundColor: theme[props.theme].fourth})

  return (
    <>
    <div style={styles.container} id="Contact" >
      <h1>Contato</h1>
      <div style={{display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'center'}} >
        <div style={styleCategoryContainer} className="contactContainer" >
          <div>
            <h3>
              <a href="https://api.whatsapp.com/send?phone=5564992432941&text=Olá&source=&data=&app_absent=" style={styleA} >
                Whatsapp
                <i style={{fontSize: '20px', marginLeft: '10px'}} class="fa">&#xf08e;</i>
              </a>
            </h3>
            <div style={styles.projectContainer} >
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIuMDM2IDUuMzM5Yy0zLjYzNSAwLTYuNTkxIDIuOTU2LTYuNTkzIDYuNTg5LS4wMDEgMS40ODMuNDM0IDIuNTk0IDEuMTY0IDMuNzU2bC0uNjY2IDIuNDMyIDIuNDk0LS42NTRjMS4xMTcuNjYzIDIuMTg0IDEuMDYxIDMuNTk1IDEuMDYxIDMuNjMyIDAgNi41OTEtMi45NTYgNi41OTItNi41OS4wMDMtMy42NDEtMi45NDItNi41OTMtNi41ODYtNi41OTR6bTMuODc2IDkuNDIzYy0uMTY1LjQ2My0uOTU3Ljg4NS0xLjMzNy45NDItLjM0MS4wNTEtLjc3My4wNzItMS4yNDgtLjA3OC0uMjg4LS4wOTEtLjY1Ny0uMjEzLTEuMTI5LS40MTctMS45ODctLjg1OC0zLjI4NS0yLjg1OS0zLjM4NC0yLjk5MS0uMDk5LS4xMzItLjgwOS0xLjA3NC0uODA5LTIuMDQ5IDAtLjk3NS41MTItMS40NTQuNjkzLTEuNjUzLjE4Mi0uMi4zOTYtLjI1LjUyOC0uMjVsLjM4LjAwN2MuMTIyLjAwNi4yODUtLjA0Ni40NDYuMzQuMTY1LjM5Ny41NjEgMS4zNzIuNjExIDEuNDcxLjA0OS4wOTkuMDgzLjIxNS4wMTYuMzQ3LS4wNjYuMTMyLS4wOTkuMjE1LS4xOTguMzNsLS4yOTcuMzQ3Yy0uMDk5LjA5OS0uMjAyLjIwNi0uMDg3LjQwNC4xMTYuMTk4LjUxMy44NDcgMS4xMDIgMS4zNzIuNzU3LjY3NSAxLjM5NS44ODQgMS41OTMuOTgzLjE5OC4wOTkuMzE0LjA4My40MjktLjA1LjExNi0uMTMyLjQ5NS0uNTc4LjYyNy0uNzc3cy4yNjQtLjE2NS40NDYtLjA5OSAxLjE1Ni41NDUgMS4zNTQuNjQ1Yy4xOTguMDk5LjMzLjE0OS4zOC4yMzEuMDQ5LjA4NS4wNDkuNDgyLS4xMTYuOTQ1em0tMTUuOTEyLTE0Ljc2MnYyNGgyNHYtMjRoLTI0em0xMi4wMzMgMTkuODYyYy0xLjMyNyAwLTIuNjM0LS4zMzMtMy43OTItLjk2NWwtNC4yMDMgMS4xMDMgMS4xMjUtNC4xMDhjLS42OTQtMS4yMDItMS4wNTktMi41NjYtMS4wNTgtMy45NjQuMDAyLTQuMzcyIDMuNTU4LTcuOTI4IDcuOTI4LTcuOTI4IDIuMTIxLjAwMSA0LjExMi44MjcgNS42MDkgMi4zMjVzMi4zMjEgMy40OTEgMi4zMiA1LjYwOWMtLjAwMiA0LjM3Mi0zLjU1OSA3LjkyOC03LjkyOSA3LjkyOHoiLz48L3N2Zz4="
                alt="logo"
                height="100px"
                width="100px"
                style={styleImg}
                onClick={() => window.open("https://api.whatsapp.com/send?phone=5564992432941&text=Olá&source=&data=&app_absent=")}
              />
            </div>
          </div>

          <div>
            <h3>
              <a href="mailto:joaopedrovieira@ufu.br" style={styleA} >
                E-mail
                <i style={{fontSize: '20px', marginLeft: '10px'}} class="fa">&#xf08e;</i>
              </a>
            </h3>
            <div style={styles.projectContainer} >
              <i 
                style={{...styleImg, fontSize: '80px', backgroundColor: '#000', color: theme[props.theme].fourth, padding: '10px'}} 
                class="im im-mail" 
                onClick={() => window.open("mailto:joaopedrovieira@ufu.br")}
              /> 
            </div>
          </div>
          <div>
            <h3>
              <a href="https://github.com/potatosenior" style={styleA} >
                Github
                <i style={{fontSize: '20px', marginLeft: '10px'}} class="fa">&#xf08e;</i>
              </a>
            </h3>
            <div style={styles.projectContainer} >
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwdjI0aDI0di0yNGgtMjR6bTE0LjUzNCAxOS41OWMtLjQwNi4wNzgtLjUzNC0uMTcxLS41MzQtLjM4NHYtMi4xOTVjMC0uNzQ3LS4yNjItMS4yMzMtLjU1LTEuNDgxIDEuNzgyLS4xOTggMy42NTQtLjg3NSAzLjY1NC0zLjk0NyAwLS44NzQtLjMxMS0xLjU4OC0uODI0LTIuMTQ3LjA4My0uMjAyLjM1Ny0xLjAxNi0uMDc5LTIuMTE3IDAgMC0uNjcxLS4yMTUtMi4xOTguODItLjYzOS0uMTgtMS4zMjMtLjI2Ny0yLjAwMy0uMjcxLS42OC4wMDMtMS4zNjQuMDkxLTIuMDAzLjI2OS0xLjUyOC0xLjAzNS0yLjItLjgyLTIuMi0uODItLjQzNCAxLjEwMi0uMTYgMS45MTUtLjA3NyAyLjExOC0uNTEyLjU2LS44MjQgMS4yNzMtLjgyNCAyLjE0NyAwIDMuMDY0IDEuODY3IDMuNzUxIDMuNjQ1IDMuOTU0LS4yMjkuMi0uNDM2LjU1Mi0uNTA4IDEuMDctLjQ1Ny4yMDQtMS42MTQuNTU3LTIuMzI4LS42NjYgMCAwLS40MjMtLjc2OC0xLjIyNy0uODI1IDAgMC0uNzgtLjAxLS4wNTUuNDg3IDAgMCAuNTI1LjI0Ni44ODkgMS4xNyAwIDAgLjQ2MyAxLjQyOCAyLjY4OC45NDR2MS40ODljMCAuMjExLS4xMjkuNDU5LS41MjguMzg1LTMuMTgtMS4wNTctNS40NzItNC4wNTYtNS40NzItNy41OSAwLTQuNDE5IDMuNTgyLTggOC04czggMy41ODEgOCA4YzAgMy41MzMtMi4yODkgNi41MzEtNS40NjYgNy41OXoiLz48L3N2Zz4="
                alt="logo"
                height="100px"
                width="100px"
                style={styleImg}
                onClick={() => window.open("https://github.com/potatosenior")}
              />
            </div>
          </div>

          <div>
            <h3>
              <a href="https://www.linkedin.com/in/joãopedrovieira/" style={styleA} >
                Linkedin
                <i style={{fontSize: '20px', marginLeft: '10px'}} class="fa">&#xf08e;</i>
              </a>
            </h3>
            <div style={styles.projectContainer} >
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwdjI0aDI0di0yNGgtMjR6bTggMTloLTN2LTExaDN2MTF6bS0xLjUtMTIuMjY4Yy0uOTY2IDAtMS43NS0uNzktMS43NS0xLjc2NHMuNzg0LTEuNzY0IDEuNzUtMS43NjQgMS43NS43OSAxLjc1IDEuNzY0LS43ODMgMS43NjQtMS43NSAxLjc2NHptMTMuNSAxMi4yNjhoLTN2LTUuNjA0YzAtMy4zNjgtNC0zLjExMy00IDB2NS42MDRoLTN2LTExaDN2MS43NjVjMS4zOTctMi41ODYgNy0yLjc3NyA3IDIuNDc2djYuNzU5eiIvPjwvc3ZnPg=="
                alt="logo"
                height="100px"
                width="100px"
                style={styleImg}
                onClick={() => window.open("https://www.linkedin.com/in/joãopedrovieira/")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <Bar theme={props.theme} /> */}
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
    flexDirection: 'auto', 
    flexWrap: 'wrap',
    width: '90%',
    //border: "0.5px solid white",
    padding: '1.5rem',
    boxShadow: '1px 1px 10px 6px rgba(0,0,0,0.45)',
    borderRadius: '1rem',
    justifyContent: 'space-around'
  },
  projectContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  projectImg: {
    borderRadius: '1rem', 
    boxShadow: "9px 5px 8px 0px rgba(0,0,0,0.5)",
    cursor: 'pointer',
  },
  p: {
    width: "80%"
  },
  a: {
    textDecoration: 'none',
    //color: 'white'
  }
}
export default Contact;