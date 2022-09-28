import React, { useContext, useEffect, useState } from 'react';

import Button from '../ui/button';
import Form from '../ui/form';
import Otp from '../ui/otp';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from '../ui/highlight';
import classes from './form-otp.module.scss';

const FormOtp = () => {
  const context = useContext(SolicitudContext);

  const [error, setError] = useState(false);
  const [resend, setResend] = useState(false);
  const [valid, setValid] = useState(false);

  const buttons = (
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

  useEffect(() => {
    if (valid) {
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
    await solicitud.sendEmailOtp();
    setResend(false);
  };

  const onSubmit = async (values) => {
    setError(false);

    const response = await solicitud.validateEmailOtp(values.otp);
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
    <Form buttons={buttons} onSubmit={onSubmit}>
      <div className={classes.description}>
        Te enviamos un
        <Highlight primary>código de verificación</Highlight> a tu email.
         Ingresa el código recibido en 
        <Highlight primary>{context.form.email}</Highlight>
      </div>
      <Otp size={4} error={error} />
    </Form>
  );
};

export default FormOtp;
