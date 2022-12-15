import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Instructions from '../ui/instructions';
import FormOtp from './form-otp';
import FormTelefono from './form-telefono';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from './../ui/highlight';
import classes from './index.module.scss';

const Telefono = () => {
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
    context.nextStep(router);
  };

  if (!visible) {
    return <div className="not-allowed"></div>;
  }

  return (
    <div className={classes.documento}>
      <Header />
      <Instructions
        image="/images/phone.png"
        vertical
        nextScreen={solicitud.screens.form}
      >
        También, necesitamos validar tu
        <Highlight primary>número de teléfono</Highlight>
        para utilizarlo como medio de contacto. Te enviaremos un
        <Highlight primary>código numérico</Highlight>
        para validar que sea correcto.
      </Instructions>
      <FormTelefono />
      <FormOtp />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default Telefono;
