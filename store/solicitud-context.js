import { createContext, useState } from 'react';

import { solicitud } from '../models/solicitud';

const SolicitudContext = createContext({
  steps: [],
  step: {},
  screen: '',
  form: {},
  formProperty: '',
  updateSteps: async () => {},
  changeScreen: (value) => {},
  updateStep: (router) => {},
  validateStep: (router) => {},
  nextStep: (router, step) => {},
  updateForm: (values) => {},
  updateFormProperty: (value) => {},
});

export function SolicitudContextProvider(props) {
  // State
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState();
  const [screen, setScreen] = useState(solicitud.screens.instructions);
  const [form, setForm] = useState({});
  const [formProperty, setFormProperty] = useState();

  // Methods
  const updateSteps = async () => {
    const values = await solicitud.getSteps();
    setSteps(values);
  };

  const changeScreen = (value) => {
    setScreen(value);
  };

  const validateStep = (router) => {
    if (steps.length === 0) {
      return false;
    }

    const allowedUrl = sessionStorage.getItem('step');
    const currentUrl = router.pathname;

    let allowedIndex = steps.findIndex((x) => x.url === allowedUrl);
    allowedIndex = allowedIndex == -1 ? 0 : allowedIndex;
    const currentIndex = steps.findIndex((x) => x.url === currentUrl);

    const allowed = currentIndex > -1 && currentIndex <= allowedIndex;

    return allowed ? undefined : steps[allowedIndex].url;
  };

  const updateStep = (router) => {
    if (router.pathname === '/procesando') {
      setStep({ url: router.pathname, title: 'En Proceso' });
      return;
    }

    if (router.pathname === '/finalizar') {
      setStep({ url: router.pathname, title: '¡Bienvenido!' });
      return;
    }

    const url = router.pathname;
    const nStep = steps.find((x) => x.url === url);
    setStep(nStep);
  };

  const nextStep = (router, url) => {
    if (url) {
      sessionStorage.setItem('step', url);
      router.push(url);
      return;
    }

    const index = steps.indexOf(step);
    const nStep = steps[index + 1];

    sessionStorage.setItem('step', nStep.url);
    router.push(nStep.url);
  };

  const updateForm = (values) => {
    setForm(values);
  };

  const updateFormProperty = (value) => {
    setFormProperty(value);
  };

  const context = {
    steps: steps,
    step: step,
    screen: screen,
    form: form,
    formProperty: formProperty,
    updateSteps: updateSteps,
    changeScreen: changeScreen,
    updateStep: updateStep,
    validateStep: validateStep,
    nextStep: nextStep,
    updateForm: updateForm,
    updateFormProperty: updateFormProperty,
  };

  return (
    <SolicitudContext.Provider value={context}>
      {props.children}
    </SolicitudContext.Provider>
  );
}

export default SolicitudContext;
