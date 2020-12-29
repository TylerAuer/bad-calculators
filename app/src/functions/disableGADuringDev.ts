declare global {
  interface Window {
    'ga-disable-UA-186238574-1': boolean;
  }
}

export default function disableGADuringDev(id: string) {
  if (window.location.hostname === 'localhost') {
    window['ga-disable-UA-186238574-1'] = true;
  }
}
