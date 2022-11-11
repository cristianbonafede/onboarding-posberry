import { useRouter } from 'next/router';

import Button from '../../ui/button';
import Highlight from './../../ui/highlight';

import classes from './../index.module.scss';

const IntentosExcedidosOtpSms = () => {
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
          Lamentablemente, superaste la cantidad máxima de intentos de
          validación de tu teléfono celular. Es posible que haya ocurrido alguno
          de los siguientes problemas:
          <ul>
            <li>Ingresaste un número de teléfono celular incorrecto.</li>
            <li>
              Existe algún problema con tu teléfono celular para recibir SMS.
            </li>
          </ul>
        </div>
        <div>
          Por favor, volvé a intentarlo más tarde. Si el problema persiste
          comunicate con{' '}
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

export default IntentosExcedidosOtpSms;
