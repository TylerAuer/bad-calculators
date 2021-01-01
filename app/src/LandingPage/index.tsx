import { SignInStatus } from '../structs/user';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { signInState } from '../state/user';
import logGAPageView from '../functions/logGAPageView';
import './index.scss';

export default function LandingPage() {
  const setSignInStatus = useSetRecoilState(signInState);

  useEffect(() => {
    logGAPageView('Landing Page', '/');
  });

  const handleSkipSignIn = () => {
    setSignInStatus(SignInStatus.OPTED_OUT);
  };

  return (
    <div className="background">
      <div className="centered">
        <div className="title-container">
          <h1 className="title">Bad Calculators</h1>
          <div className="subtitle">Mathy puzzles on unhelpful devices</div>
        </div>
        <div className="login">
          <a href="/auth/google" className="login__auth-btn">
            Sign in with Google
          </a>
          <div className="spacer" />
          <button className="login__auth-btn" onClick={handleSkipSignIn}>
            Skip creating an account<sup className="accent-color">*</sup>
          </button>
          <p className="note">
            <span className="accent-color">*</span> You'll lose your progress if
            you change devices, switch browsers, or clear your cookies.
          </p>
        </div>
      </div>
    </div>
  );
}
