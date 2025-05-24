import { useState } from 'react';
import PhoneInput from '../components/PhoneInput';
import CodeInput from '../components/CodeInput';

export default function Login({ onLogin }) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone');

  return (
    <div className="login-container">
      <h2>Login</h2>
      {step === 'phone' && (
        <PhoneInput onSuccess={(validatedPhone) => {
          setPhone(validatedPhone);
          setStep('code');
        }} />
      )}
      {step === 'code' && (
        <CodeInput phone={phone} onSuccess={onLogin} />
      )}
    </div>
  );
}
