import './App.css';
import Footer from '../footer';
import Mosaic from '../mosaic';
import { useState, useMemo, useEffect } from 'react';
import useCounter from '../hooks/useCounter'
import { Loading, Start} from '../dialog';

function App() { 
  const [imgCategory, setCategory] = useState("0");

  const [step, nextStep] = useCounter();

  useMemo(
    () => {
      if (step >= 1) {
        document.body.classList.add("blank");
      } else {
        document.body.classList.remove("blank");
      }
    },
    [step]
  );

  useEffect(
    () => {
      if (step === 2) {
        setTimeout(() => { console.log("stepping"); nextStep()}, 2500);
      }
    },
    [step]
  );

  return (
    <div className="App">
      {step === 0 && <Start setCategory={setCategory} nextStep={nextStep} />}
      {step >= 1 && <Loading step={step} />}
      <Mosaic rendering={step >= 1} imgCategory={imgCategory} nextStep={nextStep} />
      <Footer />
    </div>
  );
}

export default App;
