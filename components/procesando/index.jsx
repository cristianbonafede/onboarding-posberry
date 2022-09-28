import Image from 'next/image';

import Header from '../ui/header';

import classes from './index.module.scss';

const Procesando = () => {
  return (
    <div className={classes.finalizar}>
      <Header />
      <div className={classes.content}>
        <div className={classes.image}>
          <Image
            src="/images/send.png"
            alt="instruction"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.text}>
          <div className={classes.title}>Estamos procesando tu solicitud</div>
          <div>
            En breve nos estaremos comunicando con vos para comentarte que
            beneficios podemos ofrecerte.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Procesando;
