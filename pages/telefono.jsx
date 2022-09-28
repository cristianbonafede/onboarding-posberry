import Head from 'next/head';

import Telefono from './../components/telefono';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

import { SolicitudContextProvider } from './../store/solicitud-context';

const TelefonoPage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Telefono - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Telefono />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default TelefonoPage;
