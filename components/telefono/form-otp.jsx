import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import Button from '../ui/button';
import Form from '../ui/form';
import Otp from '../ui/otp';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from './../ui/highlight';
import classes from './form-otp.module.scss';

const FormOtp = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [error, setError] = useState(false);
  const [resend, setResend] = useState(false);
  const [valid, setValid] = useState(false);

  const renderButtons = () => {
    return (
      <React.Fragment>
        <Button
          block
          type="secondary"
          text="Reenviar"
          disabled={!resend}
          onClick={onClickSend}
        />
      </React.Fragment>
    );
  };

  useEffect(() => {
    if (valid) {
      if (context.step.actions.length === 0) {
        context.nextStep(router);
        return;
      }

      context.changeScreen(solicitud.screens.checklist);
    }
  }, [valid]);

  useEffect(() => {
    if (context.screen !== solicitud.screens.otp || resend) {
      return;
    }

    const timer = setTimeout(() => {
      setResend(true);
    }, 60000);
    return () => clearTimeout(timer);
  }, [context.screen, resend]);

  const onClickSend = async () => {
    await solicitud.sendTelefonoOtp();
    setResend(false);
  };

  const onSubmit = async (values) => {
    setError(false);

    const response = await solicitud.validateTelefonoOtp(values.otp);
    if (response) {
      context.updateForm(values);
      setValid(true);
      return;
    }

    setError(true);
  };

  if (context.screen !== solicitud.screens.otp) {
    return;
  }

  return (
    <Form renderButtons={renderButtons} onSubmit={onSubmit}>
      <div className={classes.description}>
        Te enviamos un
        <Highlight primary>código de verificación</Highlight>en un mensaje de
        texto. Ingresá el codigo recibido en el teléfono
        <Highlight primary>{context.form.telefono}</Highlight>.
      </div>
      <Otp size={4} error={error} />
    </Form>
  );
};

export default FormOtp;
