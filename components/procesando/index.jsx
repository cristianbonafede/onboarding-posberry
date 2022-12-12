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
          <div className={classes.title}>¡Ya casi terminamos!</div>
          ¡Pudimos completar el proceso satisfactoriamente!
          <br/>
          En breve, nos comunicaremos con vos para terminar el proceso de alta.
        </div>
      </div>
    </div>
  );
};

export default Procesando;
