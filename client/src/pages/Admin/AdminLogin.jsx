import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/admin", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        alert("Admin login successful");
        navigate("/admin/add-charity");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm border p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded-lg"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}