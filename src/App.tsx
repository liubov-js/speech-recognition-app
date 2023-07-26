import React, { FC, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MyButton from './components/UI/button/MyButton';
import styles from './App.module.css';

const App: FC = () => {
  const [text, setText] = useState<string>('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  useEffect(() => {
    if (text || transcript) {
      setText(
        transcript
          .split(' ')
          .map((word) => word + Math.floor(Math.random() * 100))
          .join(' ')
      );
    }
  }, [transcript, text]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>Microphone isn't available.</span>;
  }

  const reset = () => {
    resetTranscript();
    setText('');
  }

  const listen = () => {
    reset();
    startListening();
  }

  return (
    <div className={styles.container}>
      <p>Микрофон: {listening ? 'включен' : 'выключен'}</p>
      <MyButton
        onMouseDown={listen}
        onMouseUp={SpeechRecognition.stopListening}
      >
        Удерживайте для записи
      </MyButton>
      <MyButton onClick={reset} style={{marginLeft: '10px'}}>Сброс</MyButton>
      <p>{text}</p>
    </div>
  );
}

export default App;
