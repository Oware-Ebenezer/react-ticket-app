import { useNavigate } from "react-router-dom";
import { clearSession } from "../utils/authUtils";
import toast from "react-hot-toast";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    toast.success("You have logged out successfully");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
    >
      Logout
    </button>
  );
}
export default LogoutButton;
