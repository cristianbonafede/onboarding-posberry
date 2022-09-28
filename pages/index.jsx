import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { entidad } from './../models/entidad';
import { solicitud } from './../models/solicitud';
import { theme } from './../services/theme';
import { SolicitudContextProvider } from './../store/solicitud-context';

import Home from './../components/home/index';
import Layout from './../components/ui/layout';

const HomePage = () => {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('solicitud');
    sessionStorage.removeItem('step');
  }, []);

  useEffect(() => {
    let { s } = router.query;

    if (!s) {
      return;
    }

    sessionStorage.setItem('solicitud', s);
  }, [router.query]);

  useEffect(() => {
    let { t } = router.query;

    if (!t) {
      t = solicitud.types.fisica;
    }

    sessionStorage.setItem('type', t);
  }, [router.query]);

  useEffect(() => {
    async function getEntidad() {
      const { e } = router.query;

      if (!e) {
        return;
      }

      sessionStorage.setItem('entidad', e);
      const item = await entidad.get();
      theme.set(item);
      setLoaded(true);
    }

    getEntidad();
  }, [router.query]);

  if (!loaded) {
    return <div></div>;
  }

  return (
    <SolicitudContextProvider>
      <Head>
        <title>Onboarding - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Home />
      </Layout>
    </SolicitudContextProvider>
  );
};

export default HomePage;
