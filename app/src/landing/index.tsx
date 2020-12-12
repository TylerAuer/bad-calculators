import { SignInStatus } from '../structs/user';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { signInState } from '../state/user';

import './index.scss';

export default function LandingPage() {
  const setSignIn = useSetRecoilState(signInState);

  const handleOptOut = () => {
    setSignIn(SignInStatus.OPTED_OUT);
    return '/level/1';
  };

  return (
    <div className="background">
      <div className="centered">
        <div className="title-container">
          <h1 className="title">Bad Calculators</h1>
          <div className="subtitle">
            Extremely puzzling and unhelpful devices
          </div>
        </div>
        <div className="login">
          <a href="/auth/google" className="btn">
            Sign in with Google to save progress
          </a>
          <Link to={handleOptOut} className="btn">
            Don't save my progress!
          </Link>
        </div>
      </div>
    </div>
  );
}
