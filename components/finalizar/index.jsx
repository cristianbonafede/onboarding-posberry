import Image from 'next/image';
import { useEffect, useState } from 'react';

import { solicitud } from '../../models/solicitud';

import Header from '../ui/header';
import Highlight from './../ui/highlight';

import classes from './index.module.scss';

const Documento = () => {
  const [cbu, setCbu] = useState('');

  useEffect(() => {
    async function getData() {
      const response = await solicitud.get();
      setCbu(`(${response.cbu})`);
    }

    getData();
  }, []);

  return (
    <div className={classes.finalizar}>
      <Header />
      <div className={classes.content}>
        <div className={classes.image}>
          <Image
            src="/images/completed.gif"
            alt="instruction"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.text}>
          <div className={classes.title}>
            ¡Felicitaciones! Tu alta fue exitosa.
          </div>
          <div>
          Dentro de
            <Highlight primary>
            24 hs hábiles podrás cobrar con QR
            </Highlight>
            y tus ventas se 
            acreditarán en línea en tu cuenta de Banco Industrial.
            Te enviamos por mail info para operar. Si tenés consultas
            comunicate a <Highlight primary>info@bindpagos.com.ar</Highlight>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documento;
