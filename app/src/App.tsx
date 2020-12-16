import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import UserSignInMonitor from './UserSignInMonitor';
import Header from './xHeader';
import PuzzlePage from './xPuzzlePage';
import LandingPage from './xLandingPage';
import LevelPage from './xLevelsPage';
import PrivacyPage from './xPrivacyPage';

function App() {
  return (
    <div>
      <RecoilRoot>
        <HashRouter>
          <UserSignInMonitor />
          <Switch>
            <Route path="/puzzle/:puz_id">
              <Header />
              <PuzzlePage />
            </Route>

            <Route path="/level/:level_id">
              <Header />
              <LevelPage />
            </Route>

            <Route path="/build">
              <Header />
            </Route>

            <Route path="/privacy">
              <Header />
              <PrivacyPage />
            </Route>

            <Route path="/" component={LandingPage} />

            {/* Redirect any malformed links to the landing page */}
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
