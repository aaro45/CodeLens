import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
      <h1 className="text-2xl font-bold text-white">
        CodeLens
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-zinc-300">
            Hi, <span className="font-semibold">{user.name}</span>
          </span>
        )}

        {token ? (
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="rounded-lg bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-700"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;