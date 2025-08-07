import ReactGA from 'react-ga4';

const TRACKING_ID = "G-YZJVWHXW92";
const DEFAULT_VISIT_SOURCE = "unknown";

export function analytics__initGoogleAnalytics() {
    ReactGA.initialize(TRACKING_ID);
}

export function analytics__trackPageView(page: string, title: string) {
    // Get the pageSource from the current URL parameter with name "visitSource"
    const urlParams = new URLSearchParams(window.location.search);
    const visitSource = urlParams.get("visitSource") || DEFAULT_VISIT_SOURCE;

    ReactGA.send({
        hitType: "pageview",
        page: page,
        title: title,
        visitSource: visitSource
    });
}