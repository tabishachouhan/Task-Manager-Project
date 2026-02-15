import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful! Please check your email.");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Signup"}
        </button>
      </form>

      <p className="link-text">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
