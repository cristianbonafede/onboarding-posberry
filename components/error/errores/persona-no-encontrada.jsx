import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';

import classes from './../index.module.scss';

const PersonaNoEncontrada = () => {
  const router = useRouter();

  const onClickRetry = () => {
    const entidad = sessionStorage.getItem('entidad');
    const type = sessionStorage.getItem('type');
    router.push(`/?e=${entidad}&t=${type}`);
  };

  return (
    <div>
      <div className={classes.title}>
        <Highlight primary>¡Ups! Algo salió mal</Highlight>
      </div>
      <div className={classes.description}>
        <div>
          No podemos validar tu identidad ya que RENAPER (Registro Nacional de
          las Personas) no reconoce tu DNI.
        </div>
        <div>
          Por favor, asegurate de tener un DNI válido y volvé a intentarlo en
          24hs. Si el problema persiste comunicate con{' '}
          <a href="mailto:info@bindpagos.com.ar" style={{ color: '#ff9340' }}>
            info@bindpagos.com.ar
          </a>
        </div>
      </div>
      <div className={classes.action}>
        <Button type="primary" text="Reintentar" onClick={onClickRetry} />
      </div>
    </div>
  );
};

export default PersonaNoEncontrada;
