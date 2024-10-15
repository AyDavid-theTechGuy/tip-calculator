import { useState } from 'react';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);

  const tip = bill * ((percent1 + percent2) / 2 / 100);

  function handleReset() {
    setBill("");
    setPercent1(0);
    setPercent2(0);
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percent={percent1} onSelectPercent={setPercent1}>How did you like the service?</SelectPercentage>
      <SelectPercentage percent={percent2} onSelectPercent={setPercent2}>How did your friend like the service?</SelectPercentage>

      {bill > 0 && (
        <> 
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill? </label>
      <input 
        type='text' 
        placeholder='Bill value' 
        value={bill} onChange={(e) => onSetBill(Number(e.target.value))} 
      />
    </div>
  );
}

function SelectPercentage({ children, percent, onSelectPercent }) {
  return (
    <div className='select-percent'>
      <label>{children}</label>
      <select 
        value={percent} 
        onChange={(e) => onSelectPercent(Number(e.target.value))}
      >
        <option value='0'>Dissatisfied (0%)</option>
        <option value='1'>It was okay (5%)</option>
        <option value='2'>It was good (10%)</option>
        <option value='3'>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>You pay ${bill + tip} (${bill} + ${tip} tip)</h3>
  );
}

function Reset({ onReset }) {
  return (
    <button onClick={onReset}>Reset</button>
  );
}
