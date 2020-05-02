import React from 'react';
import { Sankey } from './features/sankey/Sankey';
import './App.css';
import { Header } from './features/header/Header';

function App() {
  return (
    <div className="App">
      <Header title='Centime' ></Header>
      <Sankey />
    </div>
  );
}

export default App;
