import { useContext, useEffect, useState } from 'react';

import Input from '../ui/input';
import Form from './../ui/form';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

const FormEmail = () => {
  const context = useContext(SolicitudContext);

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (valid) {
      context.changeScreen(solicitud.screens.otp);
    }
  }, [valid]);

  const onSubmit = async (values) => {
    await solicitud.updateEmail(values.email);
    await solicitud.sendEmailOtp();
    context.updateForm(values);
    setValid(true);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        label="Correo electrónico"
        name="email"
        placeholder="usuario@email.com"
        required
        autofocus
      />
    </Form>
  );
};

export default FormEmail;
