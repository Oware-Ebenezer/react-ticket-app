function statusClass(s) {
  if (s === "open") return "bg-green-100 text-[#22c55e]";
  if (s === "in_progress") return "bg-amber-100 text-[#f59e0b]";
  return "bg-gray-100 text-[#9ca3af]";
}
function TicketCard({ ticket, onEdit, onDelete }) {
  return (
    <article
      className=" bg-white 
    backdrop-blur-sm 
    border border-b-gray-400 
    rounded-2xl 
    p-5 
    text-black 
    shadow-md 
    hover:shadow-lg 
    transition-all 
    duration-300 flex flex-col justify-between"
    >
      <section>
        <h3 className="text-lg font-semibold text-gray-600">{ticket.title}</h3>
        <p className="text-sm text-[#94a3b8] mt-2">{ticket.description}</p>
      </section>
      <section className="mt-4 flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-xs ${statusClass(
            ticket.status
          )}`}
        >
          {ticket.status.replace("_", " ")}
        </span>

        <section className="flex items-center gap-2">
          <button
            onClick={() => onEdit(ticket)}
            className="text-sm px-2 py-1 border rounded-md"
            aria-label={`Edit ${ticket.title}`}
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this ticket?"))
                onDelete(ticket.id);
            }}
            className="text-sm px-2 py-1 border rounded-md"
            aria-label={`Edit ${ticket.title}`}
          >
            Delete
          </button>
        </section>
      </section>
    </article>
  );
}
export default TicketCard;
