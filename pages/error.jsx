import Head from 'next/head';
import React from 'react';

import Error from '../components/error';

const ErrorPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Ups - BIND Pagos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Error />
    </React.Fragment>
  );
};

export default ErrorPage;
