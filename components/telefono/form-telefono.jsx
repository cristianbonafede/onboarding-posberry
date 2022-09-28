import { useContext, useEffect, useState } from 'react';

import Form from '../ui/form';
import Input from '../ui/input';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

const FormTelefono = () => {
  const context = useContext(SolicitudContext);

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (valid) {
      context.changeScreen(solicitud.screens.otp);
    }
  }, [valid]);

  const onSubmit = async (values) => {
    await solicitud.updateTelefono(values.telefono);
    await solicitud.sendTelefonoOtp();
    context.updateForm(values);
    setValid(true);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        label="Teléfono"
        name="telefono"
        placeholder="261234567890"
        required
        autofocus
      />
    </Form>
  );
};

export default FormTelefono;
