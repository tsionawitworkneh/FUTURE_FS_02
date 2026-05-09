import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaShieldAlt } from "react-icons/fa";

import {
  signIn,
  DEMO_EMAIL,
  DEMO_PASSWORD,
} from "../auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(DEMO_EMAIL);

  const [password, setPassword] =
    useState(DEMO_PASSWORD);

  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const success = signIn(email, password);

    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">

      <form className="login-card" onSubmit={submit}>

        <div className="shield">
          <FaShieldAlt />
        </div>

        <h1>Mini CRM Access</h1>

        <p className="muted">
          Enter your credentials
        </p>

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <button className="primary-btn">
          Sign In
        </button>

      </form>

    </div>
  );
}