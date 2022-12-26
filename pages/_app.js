import { useEffect } from 'react';

import { SolicitudContextProvider } from './../store/solicitud-context';

import '../styles/globals.scss';

import '../styles/buttons.scss';
import '../styles/forms.scss';
import '../styles/inputs.scss';
import '../styles/selects.scss';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  return (
    <SolicitudContextProvider>
      <Component {...pageProps} />
    </SolicitudContextProvider>
  );
}

export default MyApp;
