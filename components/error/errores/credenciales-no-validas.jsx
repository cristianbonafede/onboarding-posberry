import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';

import classes from './../index.module.scss';

const CredencialesNoValidas = () => {
  const router = useRouter();

  const onClickRetry = () => {
    router.push('/credenciales');
  };

  return (
    <div>
      <div className={classes.title}>
        <Highlight primary>¡Ups! Algo salió mal</Highlight>
      </div>
      <div className={classes.description}>
        Las credenciales ingresadas no respetan las condiciones necesarias. Por
        favor intenta con unas diferentes.
      </div>
      <div className={classes.action}>
        <Button type="primary" text="Reintentar" onClick={onClickRetry} />
      </div>
    </div>
  );
};

export default CredencialesNoValidas;
