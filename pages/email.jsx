import Head from 'next/head';

import Email from './../components/email';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

import { SolicitudContextProvider } from './../store/solicitud-context';

const EmailPage = () => {
  return (
    <SolicitudContextProvider>
      <Head>
        <title>Email - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Email />
        </Card>
      </Layout>
    </SolicitudContextProvider>
  );
};

export default EmailPage;
