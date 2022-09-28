import Head from 'next/head';

import Documento from './../components/documento';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

import { SolicitudContextProvider } from './../store/solicitud-context';

const DocumentoPage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Documento - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Documento />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default DocumentoPage;
