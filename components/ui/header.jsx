import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';

import classes from './header.module.scss';

const Header = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [visible, setVisible] = useState(false);
  const [colorAccent, setColorAccent] = useState();
  const [colorPrimary, setColorPrimary] = useState();
  const [colorText, setColorText] = useState();

  const [previousStep, setPreviousStep] = useState();

  useEffect(() => {
    context.updateStep(router);

    const steps = solicitud.getSteps();
    const step = steps.find((x) => x.url === router.pathname);
    const index = steps.indexOf(step) - 1;

    if (index > -1 && step.url !== '/finalizar' && step.url !== '/procesando') {
      setPreviousStep(steps[index]);
    }
  }, []);

  useEffect(() => {
    setColorAccent(sessionStorage.getItem('color-accent'));
    setColorPrimary(sessionStorage.getItem('color-primary'));
    setColorText(sessionStorage.getItem('color-text'));
    setVisible(true);
  }, []);

  const renderStep = () => {
    if (!context.step) {
      return;
    }

    if (context.step.url === '/finalizar') {
      return 'Finalizado';
    }

    if (context.step.url === '/procesando') {
      return 'Pendiente';
    }

    const steps = solicitud.getSteps();
    const index = steps.indexOf(context.step) + 1;
    const length = steps.length - 1;
    return `Paso ${index} de ${length}`;
  };

  const onClickBack = () => {
    router.push(previousStep.url);
  };

  if (!visible) {
    return <></>;
  }

  return (
    <div
      className={classes.header}
      style={{
        color: colorText,
        background: `linear-gradient(180deg, ${colorPrimary} 65%, transparent 35%)`,
      }}
    >
      <div className={classes.container}>
        {previousStep && (
          <div
            className={classes.back}
            style={{ color: colorAccent }}
            onClick={onClickBack}
          >
            <FiChevronLeft />
          </div>
        )}
        <div className={classes.step} style={{ color: colorAccent }}>
          {renderStep()}
        </div>
        <div className={classes.title} style={{ color: colorText }}>
          {context.step?.title}
        </div>
      </div>

      <svg
        width="100%"
        height="80"
        viewBox="0 0 500 80"
        preserveAspectRatio="none"
        className={classes.bottom}
      >
        <path d="M0,0 L0,40 Q250,80 500,40 L500,0 Z" fill={colorPrimary} />
      </svg>
    </div>
  );
};

export default Header;
