import * as React from 'react';
import {Link} from 'react-router-dom';

import './index.scss'


export default function LandingPage() {
  return (
    <div className="background">
      <div className="centered">
        <div className="title-container">
          <h1 className="title">Bad Calculators</h1>
          <div className="subtitle">Puzzling and extremely unhelpful devices</div>
        </div>
        <div className="login">
          <Link to="/level/0" className="btn">Sign in with Google</Link>
          <Link to="/level/0" className="btn">Try without saving your progress</Link>
        </div>
      </div>
    </div>
  )
}