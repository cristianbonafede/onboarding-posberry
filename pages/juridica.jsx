import Head from 'next/head';

import Card from '../components/ui/card';
import Layout from '../components/ui/layout';
import Juridica from './../components/juridica/index';

import { SolicitudContextProvider } from './../store/solicitud-context';

const JuridicaPage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Persona Jurídica - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Juridica />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default JuridicaPage;
