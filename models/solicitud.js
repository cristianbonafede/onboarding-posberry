import http from '../services/http';

const mockup = process.env.NEXT_PUBLIC_MOCKUP === 'true';
const mockupDelay = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

const types = {
  fisica: 'fisica',
  juridica: 'juridica',
  credenciales: 'credenciales',
};

const actions = {
  get: 'get',
  create: 'create',
  createJuridica: 'create-juridica',
  updateMorfologia: 'update-morfologia',
  updateListaNegra: 'update-lista-negra',
  updateListaBlanca: 'update-lista-blanca',
  updateListaNegraBind: 'update-lista-negra-bind',
  updateRenaper: 'update-renaper',
  updatePruebaVida: 'update-prueba-vida',
  updateEmail: 'update-email',
  updateEmailScoring: 'update-email-scoring',
  sendEmailOtp: 'send-email-otp',
  validateEmailOtp: 'validate-email-otp',
  updateTelefono: 'update-telefono',
  updateTelefonoScoring: 'update-telefono-scoring',
  sendTelefonoOtp: 'send-telefono-otp',
  validateTelefonoOtp: 'validate-telefono-otp',
  update: 'update',
  updatePadronA5: 'update-padron-a5',
  updateSujetoObligado: 'update-sujeto-obligado',
  updateNosis: 'update-nosis',
  updateWorldsys: 'update-worldsys',
  updateMatriz: 'update-matriz',
  updateLegajoDigital: 'update-legajo-digital',
  updateAltaCuenta: 'update-alta-cuenta',
  updateCredenciales: 'update-credenciales',
};

const screens = {
  instructions: 'instructions',
  form: 'form',
  checklist: 'checklist',
  camera: 'camera',
  otp: 'otp',
};

const status = {
  pending: '1',
  approved: '2',
  rejected: '3',
};

const get = async () => {
  if (mockup) {
    await mockupDelay();
    return {
      nombres: 'Juan Carlos',
      apellidos: 'Perez',
      calle: '9 de Julio',
      numeracion: '4752',
      municipalidad: 'Ciudad de Mendoza',
      provincia: 'Mendoza',
      documento: 12345678,
      fechaNacimiento: '01/01/1990',
      cuil: '20-12341234-5',
      cbu: '1234123412341234123412',
    };
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const create = async (frente, dorso, cropFrente, cropDorso) => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes`;
  const data = {
    entidadId: sessionStorage.getItem('entidad'),
    frente: frente && frente.substr(frente.indexOf(',') + 1),
    dorso: dorso && dorso.substr(dorso.indexOf(',') + 1),
    cropFrente: cropFrente,
    cropDorso: cropDorso,
  };

  const response = await http.post(url, data);

  if (!response.error) {
    const solicitud = response.data.id;
    sessionStorage.setItem('solicitud', solicitud);
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const createJuridica = async (nombre, cuit, rubro, email, telefono) => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudespj`;
  const data = {
    entidadId: sessionStorage.getItem('entidad'),
    nombreFantasia: nombre,
    cuit: cuit,
    rubro: rubro,
    email: email,
    telefono: telefono,
  };

  const response = await http.post(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateMorfologia = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/addalia/morfologia`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateListaNegra = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/lista-negra-interna`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateListaNegraBind = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/lista-negra-bind`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateListaBlanca = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/lista-blanca-interna`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateRenaper = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/renaper`;
  const data = {};

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updatePruebaVida = async (video) => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/addalia/prueba-vida`;
  const data = {
    video: video && video.substr(video.indexOf(',') + 1),
  };

  const response = await http.patch(url, data);

  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateEmail = async (email) => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/email`;
  const data = {
    email: email,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const sendEmailOtp = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/email/otp`;
  const data = {};

  const response = await http.post(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const validateEmailOtp = async (otp) => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/email/otp`;
  const data = {
    otp: otp,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  if (response.codigo === 'OTP_INCORRECTO') {
    return false;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateEmailScoring = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/email/scoring`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateTelefono = async (telefono) => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/telefono`;
  const data = {
    telefono: telefono,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateTelefonoScoring = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/telefono/scoring`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const sendTelefonoOtp = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/telefono/otp`;
  const data = {};

  const response = await http.post(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const validateTelefonoOtp = async (otp) => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/contacto/telefono/otp`;
  const data = {
    otp: otp,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  if (response.codigo === 'OTP_INCORRECTO') {
    return false;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const update = async (
  estadoCivil,
  esPEP,
  esFacta,
  esOcde,
  esUif,
  aceptaTyc,
  comercioNombre,
  comercioCalle,
  comercioNumeracion,
  comercioLocalidad,
  comercioProvincia
) => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}`;
  const data = {
    estadoCivil: estadoCivil,
    esPEP: esPEP,
    esFacta: esFacta,
    esOcde: esOcde,
    esUif: esUif,
    aceptaTyc: aceptaTyc,
    nombreFantasia: comercioNombre,
    comercioCalle: comercioCalle,
    comercioNumeracion: comercioNumeracion,
    comercioLocalidad: comercioLocalidad,
    comercioProvincia: comercioProvincia,
  };

  const response = await http.put(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updatePadronA5 = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/afip/a5`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateSujetoObligado = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/uif/sujeto-obligado`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateNosis = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/nosis`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateWorldsys = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/worldsys/search`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateMatriz = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/matriz-riesgo`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    const estado = response.data.estado;
    sessionStorage.setItem('status', estado);
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateLegajoDigital = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/legajo-digital`;
  const data = {};

  await http.patch(url, data);
  return true;
};

const updateAltaCuenta = async () => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/alta-cuenta`;
  const data = {};

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const updateCredenciales = async (password) => {
  if (mockup) {
    await mockupDelay();
    return true;
  }

  const id = sessionStorage.getItem('solicitud');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${id}/credenciales`;
  const data = {
    password: password,
  };

  const response = await http.patch(url, data);
  if (!response.error) {
    return true;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const runAction = async (action, form) => {
  switch (action.id) {
    case actions.create:
      return await create(
        form.frente,
        form.dorso,
        form.cropFrente,
        form.cropDorso
      );

    case actions.createJuridica:
      return await createJuridica(
        form.nombre,
        form.cuit,
        form.rubro,
        form.email,
        form.telefono
      );

    case actions.updateListaNegra:
      return await updateListaNegra();

    case actions.updateListaNegraBind:
      return await updateListaNegraBind();

    case actions.updateListaBlanca:
      return await updateListaBlanca();

    case actions.updateMorfologia:
      return await updateMorfologia();

    case actions.updateRenaper:
      return await updateRenaper();

    case actions.updatePruebaVida:
      return await updatePruebaVida(form.video);

    case actions.updateEmail:
      return await updateEmail(form.email);

    case actions.updateEmailScoring:
      return await updateEmailScoring();

    case actions.sendEmailOtp:
      return await sendEmailOtp();

    case actions.validateEmailOtp:
      return await validateEmailOtp(form.otp);

    case actions.updateTelefono:
      return await updateTelefono(form.telefono);

    case actions.updateTelefonoScoring:
      return await updateTelefonoScoring();

    case actions.sendTelefonoOtp:
      return await sendTelefonoOtp();

    case actions.validateTelefonoOtp:
      return await validateTelefonoOtp(form.otp);

    case actions.update:
      return await update(
        form.estadoCivil,
        form.esPEP,
        form.esFacta,
        form.esOcde,
        form.esUif,
        form.aceptaTyc,
        form.comercioNombre,
        form.comercioCalle,
        form.comercioNumeracion,
        form.comercioLocalidad,
        form.comercioProvincia
      );

    case actions.updatePadronA5:
      return await updatePadronA5();

    case actions.updateSujetoObligado:
      return await updateSujetoObligado();

    case actions.updateNosis:
      return await updateNosis();

    case actions.updateWorldsys:
      return await updateWorldsys();

    case actions.updateMatriz:
      return await updateMatriz();

    case actions.updateLegajoDigital:
      return await updateLegajoDigital();

    case actions.updateAltaCuenta:
      return await updateAltaCuenta();

    case actions.updateCredenciales:
      return await updateCredenciales(form.password);

    default:
      return false;
  }
};

const stepsFisica = [
  {
    url: '/documento',
    title: 'Documento',
    actions: [
      {
        id: actions.create,
        title: '',
        completed: false,
      },
      {
        id: actions.updateMorfologia,
        title: '',
        completed: false,
      },
      {
        id: actions.updateRenaper,
        title: '',
        completed: false,
      },
      {
        id: actions.updateListaNegra,
        title: '',
        completed: false,
      },
      {
        id: actions.updateListaBlanca,
        title: '',
        completed: false,
      },
      {
        id: actions.updateListaNegraBind,
        title: '',
        completed: false,
      },
      {
        id: actions.updateNosis,
        title: '',
        completed: false,
      },
    ],
  },
  {
    url: '/prueba-vida',
    title: 'Prueba de Vida',
    actions: [
      {
        id: actions.updatePruebaVida,
        title: 'Comprobando prueba de vida',
        completed: false,
      },
    ],
  },
  {
    url: '/email',
    title: 'Ingresá tu email',
    actions: [
      {
        id: actions.updateEmailScoring,
        title: '',
        completed: false,
      },
    ],
  },
  {
    url: '/telefono',
    title: 'Ingresá tu teléfono',
    actions: [
      {
        id: actions.updateTelefonoScoring,
        title: '',
        completed: false,
      },
    ],
  },
  {
    url: '/formulario',
    title: 'Algunos datos más',
    actions: [
      {
        id: actions.update,
        title: '',
        completed: false,
      },
      {
        id: actions.updatePadronA5,
        title: '',
        completed: false,
      },
      {
        id: actions.updateSujetoObligado,
        title: '',
        completed: false,
      },

      {
        id: actions.updateWorldsys,
        title: '',
        completed: false,
      },
      {
        id: actions.updateMatriz,
        title: '',
        completed: false,
      },
      {
        id: actions.updateLegajoDigital,
        title: '',
        completed: false,
      },
    ],
  },
  {
    url: '/credenciales',
    title: 'Credenciales Banco',
    actions: [
      {
        id: actions.updateAltaCuenta,
        title: 'Creando cuenta',
        completed: false,
      },
      {
        id: actions.updateCredenciales,
        title: 'Actualizando credenciales',
        completed: false,
      },
    ],
  },
  { url: '/finalizar', title: '¡Felicitaciones!' },
];

const stepsJuridica = [
  {
    url: '/juridica',
    title: 'Completá el Formulario',
    actions: [
      {
        id: actions.createJuridica,
        title: 'Creando solicitud',
        completed: false,
      },
    ],
  },
  { url: '/procesando', title: 'Procesando Solicitud' },
];

const stepsCredenciales = [
  {
    url: '/telefono',
    title: 'Ingresá tu teléfono',
    actions: [],
  },
  {
    url: '/credenciales',
    title: 'Credenciales',
    actions: [
      {
        id: actions.updateAltaCuenta,
        title: 'Creando cuenta',
        completed: false,
      },
      {
        id: actions.updateCredenciales,
        title: 'Actualizando credenciales',
        completed: false,
      },
    ],
  },
  { url: '/finalizar', title: '¡Felicitaciones!' },
];

const getSteps = () => {
  const type = sessionStorage.getItem('type');

  switch (type) {
    case types.juridica:
      return stepsJuridica;

    case types.credenciales:
      return stepsCredenciales;

    default:
      return stepsFisica;
  }
};

export const solicitud = {
  types: types,
  actions: actions,
  screens: screens,
  status: status,
  getSteps: getSteps,
  get: get,
  create: create,
  createJuridica: createJuridica,
  updateMorfologia: updateMorfologia,
  updateRenaper: updateRenaper,
  updatePruebaVida: updatePruebaVida,
  updateEmail: updateEmail,
  updateEmailScoring: updateEmailScoring,
  sendEmailOtp: sendEmailOtp,
  validateEmailOtp: validateEmailOtp,
  updateTelefono: updateTelefono,
  updateTelefonoScoring: updateTelefonoScoring,
  sendTelefonoOtp: sendTelefonoOtp,
  validateTelefonoOtp: validateTelefonoOtp,
  update: update,
  updatePadronA5: updatePadronA5,
  updateSujetoObligado: updateSujetoObligado,
  updateNosis: updateNosis,
  updateWorldsys: updateWorldsys,
  updateMatriz: updateMatriz,
  updateLegajoDigital: updateLegajoDigital,
  updateCredenciales: updateCredenciales,
  runAction: runAction,
};
