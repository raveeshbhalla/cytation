import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-MJ1QHQK4G0');
};

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  };
  
  export const logEvent = (category, action, label) => {
    ReactGA.event({ category, action, label });
  };