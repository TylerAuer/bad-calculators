import * as React from 'react';
import {Link} from 'react-router-dom';

import './index.scss'


export default function LandingPage() {
  return (
    <div className="background">
      <div className="centered">
        <div className="title-container">
          <h1 className="title">Bad Calculators</h1>
          <div className="subtitle">Extremely puzzling and unhelpful devices</div>
        </div>
        <div className="login">
          <a href="/auth/google" className="btn">Sign in with Google to save progress</a>
          <Link to="/level/1" className="btn">Puzzle without saving</Link>
        </div>
      </div>
    </div>
  )
}