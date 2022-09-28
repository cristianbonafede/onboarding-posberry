import Head from 'next/head';

import Credenciales from '../components/credenciales';
import Card from '../components/ui/card';
import Layout from '../components/ui/layout';

import { SolicitudContextProvider } from '../store/solicitud-context';

const CredencialesPage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Credenciales - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Credenciales />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default CredencialesPage;
