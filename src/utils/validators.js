export const STATUS_OPTIONS = ["open", "in_progress", "closed"];

export function validateTicketPayload(payload = {}) {
  const errors = {};

  if (typeof payload !== "object" || Array.isArray(payload)) {
    errors.form = "Invalid payload.";
    return errors;
  }

  const title = (payload.title || "").trim();
  const status = (payload.status || "").trim();
  const description = (payload.description || "").trim();

  if (!title) errors.title = "Title is required.";
  if (!status) errors.status = "Status is required.";
  else if (!STATUS_OPTIONS.includes(status)) {
    errors.status = "Status must be 'open', 'in_progress', or 'closed'.";
  }
  if (description.length > 1000) {
    errors.description = "Description cannot exceed 1000 characters.";
  }

  return errors;
}
