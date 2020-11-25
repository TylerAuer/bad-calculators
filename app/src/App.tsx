import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Puzzle from './puzzle';
import LandingPage from './landing'

function App() {
  return (
    <div>
      <RecoilRoot>
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
