import { useState } from "react";
import supabase from "../supabase/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    localStorage.setItem("token", data.session.access_token);
    navigate("/dashboard");
  };

  return (
    <div>
        return (
  <div className="container">
    <h2>Login</h2>

    <input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleLogin}>Login</button>

    <p className="link-text">
      Don't have account? <Link to="/signup">Signup</Link>
    </p>
  </div>
);

      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
