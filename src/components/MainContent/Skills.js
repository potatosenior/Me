import React from 'react';
import Bar from '../bar';
import SkillBar from './SkillBar';

function Skills(props) {
  return (
    <>
    <div style={styles.container} id="Skills" >
      <h1 >Meus conhecimentos</h1>
      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}} >
        <SkillBar theme={props.theme} name="React Native" width="80%" color="#11dcfb" />
        <SkillBar theme={props.theme} name="Javascript" width="80%" color="#f7df1e" />
        <SkillBar theme={props.theme} name="Nodejs" width="70%" color="#93c33c" />
        <SkillBar theme={props.theme} name="Firebase" width="60%" color="#fbc125" />
        <SkillBar theme={props.theme} name="HTML" width="60%" color="#e85327" />
        <SkillBar theme={props.theme} name="C++" width="60%" color="#649cd3" />
        <SkillBar theme={props.theme} name="Python" width="60%" color="#052452" />
        <SkillBar theme={props.theme} name="ReactJS" width="50%" color="#63dbfa" />
        <SkillBar theme={props.theme} name="C" width="50%" color="#aabccd" />
        <SkillBar theme={props.theme} name="Django" width="40%" color="#0c2c1c" />
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
    padding: '1.5rem',
    justifyContent: 'center',
    // backgroundColor: 'red',
  }
}
export default Skills;