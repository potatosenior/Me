import React from 'react';

import theme from '../../utils/theme';

const SkillBar = (props) => {
  return (
    <>
      <p style={styles.p}>{props.name}</p>
      <div style={{...styles.skillContainer, backgroundColor: theme[props.theme].primary}} >
        <div style={{...styles.skillBar, width: props.width, backgroundColor: props.color}} >{props.width}</div>
      </div>
    </>
  )
}
const styles = {
  skillContainer: {
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: '50px'
  },
  skillBar: {
    textAlign: 'right',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingRight: '0.5rem',
    color: 'white',
    borderRadius: '50px'
  }
}
export default SkillBar;