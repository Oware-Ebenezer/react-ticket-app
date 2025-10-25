import { useEffect, useState, useCallback } from "react";
import { STATUS_OPTIONS, validateTicketPayload } from "../utils/validators";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function TicketForm({ initial = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial.title ?? "");
  const [status, setStatus] = useState(initial.status ?? "open");
  const [description, setDescription] = useState(initial.desc ?? "");
  const [priority, setPriority] = useState(initial.priority ?? "normal");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initial) return;
    setTitle(initial.title ?? "");
    setStatus(initial.status ?? "open");
    setDescription(initial.desc ?? "");
    setPriority(initial.priority ?? "normal");
    setErrors({});
  }, [initial]);

  const runValidate = useCallback(() => {
    const errs = validateTicketPayload({ title, status, description });
    setErrors(errs);
    return errs;
  }, [title, status, description]);

  useEffect(() => {
    runValidate();
  }, [runValidate]);

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

  function handleBackToDashboard() {
    setLoading(true);
    toast.success("Returning to Dashboard...");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1200); 
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
    bg-white 
    backdrop-blur-sm 
    border border-gray-400
    rounded-2xl 
    p-5 
    text-black 
    shadow-md 
    hover:shadow-lg 
    transition-all 
    duration-300 
  "
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="col-span-1">
          <label className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            aria-label="ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 rounded border border-gray-400 focus:ring-2 outline-0 focus:ring-green-400  w-full"
            placeholder="Short descriptive title"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </section>
        <section>
          <label className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <select
            aria-label="ticket title"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 rounded border border-gray-400 focus:ring-2 outline-0 focus:ring-green-400 w-full"
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
            className="mt-1 p-2 rounded border border-gray-400 focus:ring-2 outline-0 focus:ring-green-400 w-full min-h-[90px]"
            placeholder="More details (optional)"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </section>
        <section className="flex items-center mt-4 gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-[#06c122] text-white rounded"
          >
            Save
          </button>
          {onCancel && (
            <button
              type="button"
              className="px-4 py-2  bg-[#c11f06] text-white rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </section>
      </section>
      <button
        type="button"
        onClick={handleBackToDashboard}
        disabled={loading}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white transition-all ${
          loading
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? (
          <>
            <svg
              className="w-5 h-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span>Returning...</span>
          </>
        ) : (
          "← Back to Dashboard"
        )}
      </button>
    </form>
  );
}
export default TicketForm;
