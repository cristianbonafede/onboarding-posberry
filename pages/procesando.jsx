import Head from 'next/head';

import Procesando from '../components/procesando';
import Card from '../components/ui/card';
import Layout from '../components/ui/layout';

import { SolicitudContextProvider } from '../store/solicitud-context';

const ProcesandoPage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Procesando - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Procesando />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default ProcesandoPage;
