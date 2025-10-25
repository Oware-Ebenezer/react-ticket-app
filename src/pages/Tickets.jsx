import { useEffect, useState } from "react";
import { ticketsServices } from "../services/ticketServices";
import toast from "react-hot-toast";
import TicketForm from "../components/TicketForm";
import TicketCard from "../components/TicketCard";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    try {
      setTickets(ticketsServices.list());
    } catch {
      toast.error("Failed to load tickets. Please retry.");
    }
  }, []);

  const handleCreate = (payload) => {
    try {
      const created = ticketsServices.create(payload);
      setTickets((s) => [created, ...s]);
      toast.success("Ticket created successfully");
    } catch (err) {
      if (err.meta) Object.values(err.meta).forEach((msg) => toast.error(msg));
      else toast.error(err.message || "Failed to create ticket");
    }
  };

  const handleUpdate = (id, patch) => {
    try {
      const updated = ticketsServices.update(id, patch);
      setTickets((s) => s.map((x) => (x.id === updated.id ? updated : x)));
      setEditing(null);
      toast.success("Ticket updated");
    } catch (err) {
      if (err.meta) Object.values(err.meta).forEach((msg) => toast.error(msg));
      else toast.error(err.message || "Failed to update ticket");
    }
  };

  const handleDelete = (id) => {
    try {
      ticketsServices.remove(id);
      setTickets((s) => s.filter((x) => x.id !== id));
      toast.success("Ticket deleted");
    } catch (err) {
      toast.error(err.message || "Failed to delete ticket");
    }
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Ticket Management</h2>
      </div>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          {editing ? "Edit Ticket" : "Create Ticket"}
        </h3>
        <TicketForm
          initial={editing || {}}
          onSubmit={(payload) => {
            if (editing) handleUpdate(editing.id, payload);
            else handleCreate(payload);
          }}
          onCancel={() => setEditing(null)}
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">All Tickets</h3>
        {tickets.length === 0 ? (
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
            No tickets yet. Create one above
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((t) => (
              <TicketCard
                key={t.id}
                ticket={t}
                onEdit={() => setEditing(t)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Tickets;
