import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Calculator from './components/Calculator';
import LandingPage from './pages/root'

function App() {
  return (
    <div>
      <RecoilRoot>
        <HashRouter>
          <Switch>
            <Route path='/puzzle/:id'/>
            <Route path='/level/:id'/> 
            <Route path='/test' component={Calculator}/> 
            <Route path='/build'/>
            <Route path='/' component={LandingPage}/>
          </Switch>
        </HashRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
