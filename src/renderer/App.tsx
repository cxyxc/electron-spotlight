import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import InputArea from './components/InputArea';
import ListArea from './components/ListArea';
import './App.global.css';

const { ipcRenderer } = window.electron;

export default function App() {
  return (
    <Router>
      <InputArea />
      <Switch>
        <Route path="/aaa" component={ListArea} />
      </Switch>
    </Router>
  );
}
