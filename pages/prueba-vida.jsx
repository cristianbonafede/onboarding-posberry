import Head from 'next/head';

import PruebaVida from './../components/prueba-vida';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

import { SolicitudContextProvider } from './../store/solicitud-context';

const PruebaVidaPage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Prueba de Vida - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <PruebaVida />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default PruebaVidaPage;
