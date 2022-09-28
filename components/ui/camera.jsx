/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from 'antd';
import Compressor from 'compressorjs';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FiCamera, FiImage, FiVideo } from 'react-icons/fi';
import Webcam from 'react-webcam';

import SolicitudContext from '../../store/solicitud-context';
import { solicitud } from './../../models/solicitud';

import classes from './camera.module.scss';

const Camera = (props) => {
  const { type, overlay, duration, upload, onSubmit } = props;

  const context = useContext(SolicitudContext);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const fileRef = useRef(null);

  const [colorPrimary, setColorPrimary] = useState();
  const [colorText, setColorText] = useState();

  const [available, setAvailable] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const isMobile = window.innerWidth <= window.innerHeight;
  const mirrored = type === 'video';

  const contraints = {
    facingMode:
      isMobile && type === 'photo' ? { exact: 'environment' } : 'user',
  };

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
    setColorText(sessionStorage.getItem('color-text'));
  }, []);

  const formatTimer = (seconds) => {
    const nMinutes = seconds > 59 ? Math.floor(seconds / 60) : 0;
    const nSeconds = seconds > 59 ? seconds % 60 : seconds;
    const nTimer =
      String(nMinutes).padStart(2, '0') +
      ':' +
      String(nSeconds).padStart(2, '0');

    return nTimer;
  };

  let timerDuration = duration;
  const [timer, setTimer] = useState(formatTimer(duration));

  const onClickShoot = () => {
    if (type === 'photo') {
      takePicture();
    }

    if (type === 'video') {
      recordVideo();
    }
  };

  const takePicture = () => {
    const base64 = webcamRef.current.getScreenshot();
    // previewImage(base64);
    onSubmit(base64);
  };

  const onClickUpload = () => {
    fileRef.current.click();
  };

  const recordVideo = useCallback(() => {
    setCapturing(true);

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const stopVideo = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      });

      const base64 = await blobToBase64(blob);
      // previewVideo(base64);
      onSubmit(base64);

      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const onUploadFile = (e) => {
    const files = e.currentTarget.files;
    if (files.length === 0) {
      return;
    }

    const file = files[0];

    new Compressor(file, {
      quality: 0.6,
      async success(result) {
        let reader = new FileReader();

        reader.onload = async () => {
          const base64 = reader.result;
          onSubmit(base64);
        };

        reader.readAsDataURL(file);
      },
      error(err) {
        console.log(err.message);
      },
    });

    e.currentTarget.value = '';
  };

  const renderUpload = () => {
    if (!upload) {
      return <div className={classes.placeholder}></div>;
    }

    return (
      <Tooltip placement="top" title="Galeria" visible={true}>
        <div
          className={classes.upload}
          onClick={onClickUpload}
          style={{
            color: colorText,
            backgroundColor: colorPrimary,
            boxShadow: `0 0 10px ${colorPrimary}`,
          }}
        >
          <FiImage />
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={onUploadFile}
          />
        </div>
      </Tooltip>
    );
  };

  const renderAction = () => {
    const icon = type === 'video' ? <FiVideo /> : <FiCamera />;
    const text = type === 'video' ? 'Grabar video' : 'Tomar foto';

    return (
      <Tooltip placement="top" title={text} visible={true}>
        <div
          className={classes.shoot}
          onClick={onClickShoot}
          style={{
            color: colorText,
            backgroundColor: colorPrimary,
            boxShadow: `0 0 10px ${colorPrimary}`,
          }}
        >
          <div className={classes.icon}>{icon}</div>
        </div>
      </Tooltip>
    );
  };

  const previewImage = (base64) => {
    var newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${base64}">`;
  };

  const previewVideo = (base64) => {
    var newTab = window.open();
    newTab.document.body.innerHTML = `<video src="${base64}" controls="true">`;
  };

  useEffect(() => {
    // Mostrar grabar despues de 1 segundo
    const timeout = setTimeout(() => setAvailable(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Actualizar timer cada 1 segundo
    if (!capturing) return;

    const interval = setInterval(() => {
      timerDuration = timerDuration - 1;
      setTimer(formatTimer(timerDuration));

      if (timerDuration < 0) {
        clearInterval(interval);
        stopVideo();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [capturing]);

  useEffect(() => {
    if (capturing || recordedChunks.length === 0) return;
    handleDownload();
  }, [recordedChunks]);

  if (context.screen !== solicitud.screens.camera) {
    return;
  }

  return (
    <div className={classes.camera}>
      <Webcam
        className={classes.webcam}
        ref={webcamRef}
        videoConstraints={contraints}
        mirrored={mirrored}
        audio={false}
        screenshotFormat="image/jpeg"
      />
      <div className={classes.overlay}>
        {overlay === 'card' && <div className={classes.card}></div>}
        {overlay === 'face' && <div className={classes.face}></div>}

        {capturing && type === 'video' && (
          <div className={classes.timer}>
            <div className={classes.icon}></div>
            <div className={classes.text}>{timer}</div>
          </div>
        )}

        {available && !capturing && (
          <div className={classes.actions}>
            {renderUpload()}
            {renderAction()}
            <div className={classes.placeholder}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
