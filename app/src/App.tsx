import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/Header'
import Puzzle from './puzzle';
import LandingPage from './landing'

function App() {
  return (
    <div>
      <RecoilRoot>
        <Header />
        <HashRouter>
          <Switch>
            <Route path='/puzzle/:id'/>
            <Route path='/level/:id'/> 
            <Route path='/test' component={Puzzle}/> 
            <Route path='/build'/>
            <Route path='/' component={LandingPage}/>
          </Switch>
        </HashRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
