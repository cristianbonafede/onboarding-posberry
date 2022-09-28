import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';

import classes from './../index.module.scss';

const Generico = () => {
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
        Ha ocurrido un error general. Por favor, volvé a intentarlo más tarde y
        si el problema persiste comunicate con{' '}
        <a
          href="mailto:info@bindpagos.com.ar"
          style={{ color: '#ff9340' }}
        >
          info@bindpagos.com.ar
        </a>
      </div>
      <div className={classes.action}>
        <Button type="primary" text="Reintentar" onClick={onClickRetry} />
      </div>
    </div>
  );
};

export default Generico;
