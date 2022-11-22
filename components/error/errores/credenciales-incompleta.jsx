import { useRouter } from 'next/router';

import Highlight from '../../ui/highlight';

import classes from './../index.module.scss';

const CredencialesIncompletas = () => {
  const router = useRouter();


  return (
    <div>
      <div className={classes.title}>
        <Highlight primary>¡Ups! Algo salió mal</Highlight>
      </div>
      <div className={classes.description}>
      Pudimos validar tu identidad y crear tu cuenta satisfactoriamente, pero ha ocurrido un error al generar las credenciales de tu homebanking. 
Por eso nos comunicaremos en breve con vos para que puedas reintentarlo.
      </div>

    </div>
  );
};

export default CredencialesIncompletas;
