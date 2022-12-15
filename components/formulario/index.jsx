import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Instructions from '../ui/instructions';
import FormFormulario from './form-formulario';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from './../ui/highlight';
import classes from './index.module.scss';

const Formulario = () => {
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
  }, [context.steps]);

  const onFinish = () => {
    const status = sessionStorage.getItem('status');

    if (status === solicitud.status.validation) {
      context.nextStep(router, '/procesando');
      return;
    }

    if (status === solicitud.status.rejected) {
      context.nextStep(router, '/error?code=RECHAZO_MATRIZ_DE_RIESGO');
      return;
    }

    context.nextStep(router);
  };

  if (!visible) {
    return <div className="not-allowed"></div>;
  }

  return (
    <div className={classes.formulario}>
      <Header />
      <Instructions
        image="/images/agreement.png"
        vertical
        nextScreen={solicitud.screens.form}
      >
        Ahora necesitamos que completes un pequeño
        <Highlight primary>formulario</Highlight> y aceptes los
        <Highlight primary>términos y condiciones</Highlight>
      </Instructions>
      <FormFormulario />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default Formulario;
