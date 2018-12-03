import React from 'react';
import './App.css';
import Todos from './components/Todos';

const App = (props) => {
  return (
    <section className="App">
      <h1 className="App__title">Todo List</h1>
      <Todos />
    </section>
  );
};

export default App;
