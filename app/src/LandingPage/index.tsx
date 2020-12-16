import './index.scss';

export default function LandingPage() {
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
            Sign in with Google
          </a>
        </div>
      </div>
    </div>
  );
}
