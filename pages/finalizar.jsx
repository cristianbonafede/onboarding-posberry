import Head from 'next/head';

import Finalizar from './../components/finalizar';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

import { SolicitudContextProvider } from './../store/solicitud-context';

const FinalizarPage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Finalizar - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Finalizar />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default FinalizarPage;
