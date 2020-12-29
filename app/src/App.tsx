import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import UserSignInMonitor from './UserSignInMonitor';
import Header from './Header';
import PuzzlePage from './PuzzlePage';
import LandingPage from './LandingPage';
import LevelPage from './LevelsPage';
import PrivacyPage from './PrivacyPage';
import GA from 'react-ga';
import disableGADuringDev from './functions/disableGADuringDev';

const googleAnalyticsID = 'UA-186238574-1';
GA.initialize(googleAnalyticsID);

disableGADuringDev(googleAnalyticsID);

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
