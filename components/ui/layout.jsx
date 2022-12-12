import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { solicitud } from './../../models/solicitud';

import Button from './button';
import Highlight from './highlight';

import classes from './layout.module.scss';

const Layout = (props) => {
  const { children } = props;

  const router = useRouter();
  const isHome = router.pathname == '/';

  const [visible, setVisible] = useState(false);
  const [logo, setLogo] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setLogo(sessionStorage.getItem('logo'));
    setType(sessionStorage.getItem('type'));
    setVisible(true);
  }, []);

  const onClickRegister = () => {
    const steps = solicitud.getSteps();
    const url = steps[0].url;
    router.push(url);
  };

  if (!visible) {
    return <></>;
  }

  const renderText = () => {
    if (type == 'credenciales') {
      return (
        <div>
          <div className={classes.title}>¡Hola de nuevo!</div>
          <div className={classes.description}>
            Para completar el proceso sólo falta completar
            <Highlight primary>un paso más.</Highlight>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className={classes.title}>
            ¡Bienvenido! Para comenzar a cobrar con QR necesitamos
            <Highlight primary>validar tu identidad.</Highlight>
          </div>
          <div className={classes.description}>
            Tomará unos pocos minutos. Te recomendamos
            <Highlight primary>tener a mano tu DNI</Highlight> y ubicarte en un
            lugar con buena luz.
            <br/>
            Recordá que es necesario tener una actividad en AFIP.
          </div>
        </div>
      );
    }
  };

  return (
    <div className={classes.layout}>
      <div className={classes.gradient}>
        <div className={`${classes.jumbotron} ${isHome && classes.home}`}>
          <div className={classes.logo}>
            <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
          </div>
          {renderText()}
          {isHome && (
            <Button type="primary" text="Iniciar" onClick={onClickRegister} />
          )}
        </div>
        <div className={`${classes.main} ${isHome && classes.home}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
