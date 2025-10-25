import { useEffect, useState } from "react";
import { STATUS_OPTIONS, validateTicketPayload } from "../utils/validators";

function TicketForm(initial = null, onSubmit, onCancel) {
  const [title, setTitle] = useState(initial?.title || "");
  const [status, setStatus] = useState(initial?.status || "open");
  const [description, setDescription] = useState(initial?.desc || "");
  const [priority, setPriority] = useState(initial?.priority || "normal");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initial?.title || "");
    setStatus(initial?.status || "open");
    setDescription(initial?.desc || "");
    setPriority(initial?.priority || "normal");
    setErrors({});
  }, [initial]);

  function runValidate() {
    const errs = validateTicketPayload({ title, status, description });
    setErrors(errs);
    return errs;
  }

  useEffect(() => {
    runValidate();
  }, [title, status, description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = runValidate();
    if (Object.keys(errs).length) return;
    onSubmit({
      title: title.trim(),
      status,
      description: description.trim(),
      priority,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0b1220]">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="col-span-1">
          <label className="block text-sm font-medium text-gray-400">
            Title
          </label>
          <input
            aria-label="ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 rounded bg-black/20 w-full"
            placeholder="Short descriptive title"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </section>
        <section>
          <label className="block text-sm font-medium text-gray-400">
            Status
          </label>
          <select
            aria-label="ticket title"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 rounded bg-black/20 w-full"
            placeholder="Short descriptive title"
          >
            {STATUS_OPTIONS.map((stat) => (
              <option key={stat} value={stat}>
                {stat.replace("_", " ")}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-red-400 text-sm mt-1">{errors.status}</p>
          )}
        </section>
        <section className="mt-4">
          <label className="block text-sm font-medium text-gray-300">
            Description (optional)
          </label>
          <textarea
            aria-label="ticket description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 rounded bg-black/20 w-full min-h-[90px]"
            placeholder="More details (optional)"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </section>
        <section className="flex items-center mt-4 gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-[#06b6d4] text-black rounded"
          >
            Save
          </button>
          {onCancel && (
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </section>
      </section>
    </form>
  );
}
export default TicketForm;
