import ReactGA from "react-ga4";

// REPLACE G-X1LRNLF5K0 with YOUR GA4 Measurement ID
ReactGA.initialize("G-X1LRNLF5K0");

export const trackEvent = (action, category = "user_action", label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const trackPage = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};

export default ReactGA;
