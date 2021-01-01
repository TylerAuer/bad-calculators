import { useEffect } from 'react';
import logGAPageView from '../functions/logGAPageView';
import './index.scss';

export default function PrivacyPage() {
  useEffect(() => {
    logGAPageView('Privacy', '/privacy');
  });

  return (
    <div className="privacy">
      <h2 className="privacy__title">Privacy and Your Data</h2>
      <p>
        Bad Calculators uses data provided from other sites (like Google) to
        create an account for you on BadCalculators.com. In doing so, we gain
        access to your basic profile info such as your name, email, and profile
        photo.
      </p>
      <p>
        We use this data to identify you when you visit at different times or on
        different devices and track your progress on the puzzles. Your data is
        not sold, nor shared with anyone other than the developers of
        BadCalculators.com.
      </p>
      <p>
        We don't have a secret plan to sell ads or your data. We just like
        making fun puzzles for you to solve.
      </p>
      <p>
        In the future, we may opt to send an email to our users with feature
        updates or other important information. We aren't fans of SPAM, so we'll
        do our best to only do this if we have something worth sharing.
      </p>
      <p>
        If this approach makes you uncomfortable, you are always welcome to work
        on the puzzles without an account. We just won't be able to retain your
        progress if your close or refresh your browser tab.
      </p>
    </div>
  );
}
