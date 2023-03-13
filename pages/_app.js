import { SolicitudContextProvider } from './../store/solicitud-context';

import '../styles/globals.scss';

import '../styles/buttons.scss';
import '../styles/forms.scss';
import '../styles/inputs.scss';
import '../styles/selects.scss';

function MyApp({ Component, pageProps }) {
  return (
    <SolicitudContextProvider>
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <Component {...pageProps} />
    </SolicitudContextProvider>
  );
}

export default MyApp;
