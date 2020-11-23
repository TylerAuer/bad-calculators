import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './pages/root'

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path='/puzzle/:id'/>
          <Route path='/level/:id'/> 
          <Route path='/build'/>
          <Route path='/' component={LandingPage}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
