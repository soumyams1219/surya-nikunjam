import { useState } from "react";
import { loginAdmin } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginAdmin(
        email,
        password
      );

      login(data.token);

      navigate("/admin/dashboard");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl border border-gray-100">
        <div className="flex justify-center mb-4">
  <a href="/">
    <img
      src="/logo.png"
      alt="Surya Nikunjam"
      className="h-20 w-auto"
    />
  </a>
</div>
         <h1 className="text-3xl font-bold text-center text-gray-800">
  Surya Nikunjam
</h1>

<p className="text-center text-gray-500 mt-2">
  Community Management System
</p>

<h2 className="text-xl font-semibold text-center mt-6 mb-8 text-green-700">
  Admin Login
</h2>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >
          <div>
            <label>Email</label>

            <input
              type="email"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-500">
  © {new Date().getFullYear()} Surya Nikunjam Community
  <br />
  All Rights Reserved
</p>
      </div>
    </div>
  );
}