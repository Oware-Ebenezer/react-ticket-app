import { useEffect, useState } from "react";
import { Link,} from "react-router-dom";
import { getSession } from "./../utils/authUtils";
import { ticketsServices } from "./../services/ticketServices";
import { toast } from "react-hot-toast";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
  });
//   const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    try {
      const all = ticketsServices.list();
      const total = all.length;
      const open = all.filter((t) => t.status === "open").length;
      const in_progress = all.filter((t) => t.status === "in_progress").length;
      const closed = all.filter((t) => t.status === "closed").length;
      setStats({ total, open, in_progress, closed });
    } catch {
      toast.error("Failed to load tickets. Please retry.");
    }
  }, []);

  //   function handleLogout() {
  //     clearSession();
  //     toast.success("You have logged out.");
  //     navigate("/");
  //   }

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-8">
      <section className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Okicket Dashboard</h1>
          <p className="text-sm text-[#94a3b8]">
            Welcome back,{" "}
            <span className="font-medium">
              {session?.name || session?.email}
            </span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/tickets" className="px-3 py-2 border rounded">
            Manage Tickets
          </Link>
          {/* <button
            onClick={handleLogout}
            className="px-3 py-2 bg-red-600 text-white rounded"
          >
            Logout
          </button> */}
          <LogoutButton />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="
    bg-[#0b1220]/80 
    backdrop-blur-sm 
    border border-white/10 
    rounded-2xl 
    p-5 
    text-white 
    shadow-md 
    hover:shadow-lg 
    transition-all 
    duration-300 
    hover:scale-[1.02]
  "
        >
          <h4 className="text-sm text-[#94a3b8]">Total Tickets</h4>
          <p className="text-2xl font-semibold mt-2">{stats.total}</p>
        </div>
        <div
          className="
    bg-[#0b1220]/80 
    backdrop-blur-sm 
    border border-white/10 
    rounded-2xl 
    p-5 
    text-white 
    shadow-md 
    hover:shadow-lg 
    transition-all 
    duration-300 
    hover:scale-[1.02]
  "
        >
          <h4 className="text-sm text-[#94a3b8]">Open</h4>
          <p className="text-2xl font-semibold mt-2">{stats.open}</p>
        </div>
        <div
          className="
    bg-[#0b1220]/80 
    backdrop-blur-sm 
    border border-white/10 
    rounded-2xl 
    p-5 
    text-white 
    shadow-md 
    hover:shadow-lg 
    transition-all 
    duration-300 
    hover:scale-[1.02]
  "
        >
          <h4 className="text-sm text-[#94a3b8]">In Progess</h4>
          <p className="text-2xl font-semibold mt-2">{stats.in_progress}</p>
        </div>
        <div
          className="
    bg-[#0b1220]/80 
    backdrop-blur-sm 
    border border-white/10 
    rounded-2xl 
    p-5 
    text-white 
    shadow-md 
    hover:shadow-lg 
    transition-all 
    duration-300 
    hover:scale-[1.02]
  "
        >
          <h4 className="text-sm text-[#94a3b8]">Closed</h4>
          <p className="text-2xl font-semibold mt-2">{stats.closed}</p>
        </div>
      </section>
    </main>
  );
}
export default Dashboard;
