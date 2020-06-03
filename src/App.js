import React, {useState} from 'react';

import './App.css';
import theme from './utils/theme';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const [themeAtual, setTheme] = useState('light');

  return (
    <div style={{backgroundColor: theme[themeAtual].third }} >
      <Navbar theme={themeAtual} setTheme={setTheme} />
      <MainContent theme={themeAtual} />
      <Footer theme={themeAtual} />
    </div>
  );
}

export default App;