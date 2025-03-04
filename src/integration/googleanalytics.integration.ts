import ReactGA from 'react-ga4';

const TRACKING_ID = "G-YZJVWHXW92";

export function analytics__initGoogleAnalytics() {
    ReactGA.initialize(TRACKING_ID);
}

export function analytics__trackPageView(page: string, title: string) {
    ReactGA.send({
        hitType: "pageview",
        page: page,
        title: title
    });
}