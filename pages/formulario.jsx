import Head from 'next/head';

import Card from '../components/ui/card';
import Layout from '../components/ui/layout';
import Formulario from './../components/formulario';

import { SolicitudContextProvider } from '../store/solicitud-context';

const TerminosPage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Formulario - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Formulario />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default TerminosPage;
