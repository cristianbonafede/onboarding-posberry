import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Instructions from '../ui/instructions';
import FormVideo from './form-video';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from './../ui/highlight';
import classes from './index.module.scss';

const PruebaVida = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const redirect = context.validateStep(router);
    if (redirect) {
      router.push(redirect);
      return;
    }
    setVisible(true);
    context.updateStep(router);
  }, []);

  const onFinish = () => {
    context.nextStep(router);
  };

  if (!visible) {
    return <div className="not-allowed"></div>;
  }

  return (
    <div className={classes.documento}>
      <Header />
      <Instructions
        image="/images/video.png"
        vertical
        nextScreen={solicitud.screens.camera}
      >
        A continuación, vamos a realizar una
        <Highlight primary>prueba de vida</Highlight>
        para validar tu identidad. Grabaremos un video de 4 segundos donde se
        tiene que ver tu rostro. 
        <Highlight primary>
          Ubicá tu rostro dentro de la marca indicada,
        </Highlight>
        mirá fijo a la cámara y evitá moverte.
      </Instructions>
      <FormVideo />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default PruebaVida;
