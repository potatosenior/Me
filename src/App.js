import React, {useState} from 'react';

import './App.css';
import theme from './utils/theme';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ChangeTheme from './components/ChangeTheme';

function App() {
  const [themeAtual, setTheme] = useState('dark');

  return (
    <div style={{backgroundColor: theme[themeAtual].third }} >
      <Navbar theme={themeAtual} />
      <MainContent theme={themeAtual} />
      <Footer theme={themeAtual} />
      <ChangeTheme theme={themeAtual} setTheme={setTheme} />
    </div>
  );
}

export default App;