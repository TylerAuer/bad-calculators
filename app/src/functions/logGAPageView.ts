export default function logGAPageView(title: string, path: string): void {
  // Don't log page view if in development
  // if (window.location.hostname === 'localhost') {
  //   return
  // }

  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: `https://badcalculators/#${path}`,
    page_path: path,
    send_to: 'G-7F9CSHE3B6',
  });
}
