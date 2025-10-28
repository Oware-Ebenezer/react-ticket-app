import { Navigate } from "react-router-dom";
import { getSession } from "../utils/authUtils";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const session = getSession();

  if (!session) {
    toast.error("Your sessions has expired, please log in again.");
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
