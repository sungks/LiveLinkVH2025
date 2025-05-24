import { useState } from "react";
import axios from "axios";

export default function CodeInput({ phone }) {
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:3000/verify-code", { phone, code });
      if (onSuccess) onSuccess();
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
      {success && <p style={{ color: "green" }}>✅ Phone verified!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
