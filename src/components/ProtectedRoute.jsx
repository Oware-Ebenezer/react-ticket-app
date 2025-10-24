import { Navigate } from "react-router-dom";
import { getSession } from "../utils/authUtils";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const session = getSession();

  if (!session) {
    toast.error("Unauthorized! Please log in to access this page.");
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
