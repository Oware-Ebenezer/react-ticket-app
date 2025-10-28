import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getUsers, saveUsers, setSession } from "../../utils/authUtils";
import AuthLayout from "./AuthLayout";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    const users = getUsers();
    if (users.some((user) => user.email === email)) {
      toast.error("User with this email already exists!");
      navigate("/auth/login");
      return;
    }
    const newUser = { name, email, password };
    saveUsers(newUser);
    setSession(newUser);
    toast.success("Signup successfully!.");
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Create an Account">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Mr.John Smith"
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-0"
        />
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-blue-600 font-medium hover:underline transition"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
export default Signup;
