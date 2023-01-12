import Head from 'next/head';
import { Fragment, useEffect } from 'react';

import Documento from './../components/documento';
import Card from './../components/ui/card';
import Layout from './../components/ui/layout';

const DocumentoPage = () => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Documento - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Card>
          <Documento />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default DocumentoPage;
