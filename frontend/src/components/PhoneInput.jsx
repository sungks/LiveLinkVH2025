import { useState } from "react";
import axios from "axios";

export default function PhoneInput({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/start-verification", { phone });
      onSuccess(phone);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div>
      <input
        type="tel"
        placeholder="+1..."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Code</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
