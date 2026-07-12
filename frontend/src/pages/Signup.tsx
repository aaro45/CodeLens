import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const data = await signupUser(name, email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch {
      alert("Signup Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-96 rounded-xl bg-zinc-900 p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Signup
        </h1>

        <input
          className="mb-4 w-full rounded bg-zinc-800 p-3 text-white"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded bg-zinc-800 p-3 text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="mb-6 w-full rounded bg-zinc-800 p-3 text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full rounded bg-violet-600 py-3 text-white"
        >
          Signup
        </button>

        <p className="mt-4 text-center text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;