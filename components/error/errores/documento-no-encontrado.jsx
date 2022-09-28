import { useRouter } from 'next/router';

import Button from './../../ui/button';
import Highlight from './../../ui/highlight';

import classes from './../index.module.scss';

const DocumentoNoEncontrado = () => {
  const router = useRouter();

  const onClickRetry = () => {
    router.push('/');
  };

  return (
    <div>
      <div className={classes.title}>
        <Highlight primary>¡Ups! Algo salió mal</Highlight>
      </div>
      <div className={classes.description}>
        Tenemos problemas para leer tu DNI. Por favor, asegurate de que la
        captura sea clara y volvé a intentarlo.
      </div>
      <div className={classes.action}>
        <Button type="primary" text="Reintentar" onClick={onClickRetry} />
      </div>
    </div>
  );
};

export default DocumentoNoEncontrado;
