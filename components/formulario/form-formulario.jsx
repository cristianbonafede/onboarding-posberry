import { Col, Divider, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';

import Checkbox from '../ui/checkbox';
import Form from '../ui/form';
import Input from '../ui/input';
import Select from './../ui/select';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';
import Highlight from './../ui/highlight';

import classes from './form-formulario.module.scss';

const FormFormulario = () => {
  const context = useContext(SolicitudContext);

  const [form, setForm] = useState();
  const [valid, setValid] = useState(false);
  const [estadosCivil, setEstadosCivil] = useState([]);

  useEffect(() => {
    const list = [
      { value: 'soltero', text: 'Soltero/a' },
      { value: 'concubino', text: 'Concubino/a' },
      { value: 'casado', text: 'Casado/a' },
      { value: 'separado', text: 'Separado/a' },
      { value: 'divorciado', text: 'Divorciado/a' },
      { value: 'viudo', text: 'Viudo/a' },
    ];
    setEstadosCivil(list);
  }, []);

  useEffect(() => {
    async function getForm() {
      const response = await solicitud.get();
      setForm(response);
    }

    getForm();
  }, []);

  useEffect(() => {
    if (valid) {
      context.changeScreen(solicitud.screens.checklist);
    }
  }, [valid]);

  const onSubmit = (values) => {
    context.updateForm(values);
    setValid(true);
  };

  if (context.screen !== solicitud.screens.form) {
    return;
  }

  const renderTerminos = () => {
    return (
      <div>
        Acepto los
        <Highlight primary>
          <a
            href="http://www.google.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terminos & Condiciones &nbsp;
          </a>
          para operar como comercio QR
        </Highlight>
      </div>
    );
  };
  const renderTerminosBanco = () => {
    return (
      <div>
        Acepto los
        <Highlight primary>
          <a
            href="http://www.google.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terminos & Condiciones &nbsp;
          </a>
          para ser cliente Banco Bind
        </Highlight>
      </div>
    );
  };

  const onChangeDomicilioRepetido = (value, instance) => {
    const values = instance.getFieldsValue();
    let nForm = { ...form, ...values };
    nForm.comercioCalle = value ? nForm.calle : undefined;
    nForm.comercioNumeracion = value ? nForm.numeracion : undefined;
    nForm.comercioMunicipalidad = value ? nForm.municipalidad : undefined;
    nForm.comercioProvincia = value ? nForm.provincia : undefined;
    setForm(nForm);
  };

  return (
    <Form values={form} onSubmit={onSubmit}>
      <div className={classes.section}>
        <div className={classes.title}>
          ¡Hola {form?.nombres} {form?.apellidos}!
        </div>
        <div className={classes.subtitle}>CUIT {form?.cuil}</div>
      </div>
      <Select
        label="Estado Civil"
        name="estadoCivil"
        options={estadosCivil}
        required
      />
      <Checkbox
        label="¿Sos una persona politicamente expuesta (PEP)?"
        name="esPEP"
        description="Son personas que tienen o tuvieron una función pública.

"
      />
      <Checkbox
        label="¿Sos ciudadano o residente fiscal estadounidense (FATCA)?"
        name="esFacta"
        description="Ley emitida por Estados Unidos diseñada para detectar contribuyentes estadounidenses que no estén reportando sus ingresos en cuentas fuera del país"
      />
      <Checkbox
        label="¿Sos ciudadano o residente fiscal de otro país (OCDE)?"
        name="esOcde"
      />
      <Checkbox
        label="¿Sos Sujeto Obligado (UIF)? "
        name="esUif"
        description="Son personas que deben brindar datos a la UIF para prevenir el lavado de dinero y financiación del terrorismo"
      />
      <Checkbox label={renderTerminos()} name="aceptaTyc" required />
      <Checkbox label={renderTerminosBanco()} name="aceptaTycBanco" required />

      <Divider />

      <div className={classes.section}>
        <div className={classes.title}>Datos de tu Comercio</div>
        <div className={classes.subtitle}>
          Contanos el nombre y domicilio de tu comercio
        </div>
      </div>
      <Row gutter={16}>
        <Col xs={24} lg={24}>
          <Input label="Nombre de fantasía" name="comercioNombre" required />
        </Col>
        <Col xs={24} lg={24}>
          <Checkbox
            label="El domicilio de mi comercio coincide con mi domicilio personal"
            name="domicilioDuplicado"
            onChange={onChangeDomicilioRepetido}
          />
        </Col>
        <Col xs={24} lg={12}>
          <Input label="Calle" name="comercioCalle" required />
        </Col>
        <Col xs={24} lg={12}>
          <Input label="Numeración" name="comercioNumeracion" required />
        </Col>
        <Col xs={24} lg={12}>
          <Input label="Localidad" name="comercioMunicipalidad" required />
        </Col>
        <Col xs={24} lg={12}>
          <Input label="Provincia" name="comercioProvincia" required />
        </Col>
      </Row>
    </Form>
  );
};

export default FormFormulario;
