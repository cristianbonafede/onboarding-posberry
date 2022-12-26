import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Checklist from '../ui/checklist';
import Header from '../ui/header';
import Instructions from './../ui/instructions';
import FormImages from './form-images';

import { solicitud } from '../../models/solicitud';
import SolicitudContext from '../../store/solicitud-context';

import Highlight from './../ui/highlight';
import classes from './index.module.scss';

const Documento = () => {
  const router = useRouter();
  const context = useContext(SolicitudContext);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const validateStep = async () => {
      const redirect = await context.validateStep(router);
      if (redirect) {
        router.push(redirect);
        return;
      }

      setVisible(true);
      context.updateStep(router);
    };

    validateStep();
  }, [context.steps]);

  const onFinish = async () => {
    await context.nextStep(router);
  };

  if (!visible) {
    return <div className="not-allowed"></div>;
  }

  return (
    <div className={classes.documento}>
      <Header />
      <Instructions
        image="/images/id-front.png"
        nextScreen={solicitud.screens.form}
      >
        Para poder comenzar, necesitamos una foto del
        <Highlight primary>frente</Highlight>y
        <Highlight primary>dorso</Highlight> de tu documento. Recordá que las
        fotos tienen que ser lo mas nítidas posibles.
      </Instructions>
      <FormImages />
      <Checklist onFinish={onFinish} />
    </div>
  );
};

export default Documento;
