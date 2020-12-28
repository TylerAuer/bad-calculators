import './index.scss';

export default function LandingPage() {
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
          <a href="/puzzle/1" className="login__auth-btn">
            Skip creating an account<span className="accent-color">*</span>
          </a>
          <p className="note">
            <span className="accent-color">*</span> You'll lose your progress if
            you change devices, change browsers, or clear your cookies.
          </p>
        </div>
      </div>
    </div>
  );
}
