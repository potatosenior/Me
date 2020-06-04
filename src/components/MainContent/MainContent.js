import React from 'react';

import theme from '../../utils/theme';
import AboutMe from './AboutMe';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';

function MainContent(props) {
  return (
    <div style={{...styles.container, backgroundColor: theme[props.theme].secondary}} >
      <AboutMe theme={props.theme} />
      <Skills theme={props.theme} />
      <Projects theme={props.theme} />
      <Contact theme={props.theme} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', 
    color: 'white',
  },
}
export default MainContent;