import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/Header'
import PuzzlePage from './puzzle';
import LandingPage from './landing'
import LevelPage from './levels';

function App() {
  return (
    <div>
      <RecoilRoot>
        <Header />
        <HashRouter>
          <Switch>
            <Route path='/puzzle/:puz_id' component={PuzzlePage}/>
            <Route path='/level/:level_id' component={LevelPage}/> 
            <Route path='/build'/>
            <Route path='/' component={LandingPage}/>
          </Switch>
        </HashRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
