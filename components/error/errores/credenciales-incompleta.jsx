import { useRouter } from 'next/router';

import Highlight from '../../ui/highlight';

import classes from './../index.module.scss';

const CredencialesIncompletas = () => {
  const router = useRouter();


  return (
    <div>
      <div className={classes.title}>
        <Highlight primary>¡Ya casi terminamos!</Highlight>
      </div>
      <div className={classes.description}>
  ¡Pudimos completar el proceso satisfactoriamente!
  <br/>
  En breve, nos comunicaremos con vos para terminar el proceso de alta.
      </div>

    </div>
  );
};

export default CredencialesIncompletas;
