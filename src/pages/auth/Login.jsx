import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUsers, setSession } from "../../utils/authUtils";
import AuthLayout from "./AuthLayout";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      toast.error("Please fill all the fields");

      return;
    }

    const users = getUsers();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      toast.error("Invalid credentials");
      return;
    }
    setSession(foundUser);
    toast.success(`Login successful, Welcome back ${foundUser.name}`);
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Login to Your Account">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-0"
        />
        <input
          type="password"
          name="password"
          placeholder="*************"
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-0"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg p-3 transition"
        >
          Login
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Don't have an account?{" "}
        <Link
          to="/auth/signup"
          className="text-blue-600 font-medium hover:underline transition"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
export default Login;
