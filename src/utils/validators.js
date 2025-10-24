export const STATUS_OPTIONS = ["open", "in_progress", "closed"];

export function validateTicketPayload(payload) {
  const errors = {};
  if (!payload || typeof payload !== "object") {
    errors.form = "Invalid payload.";
    return errors;
  }

  const title = (payload.title || "").toString().trim();
  const status = (payload.status || "").toString().trim();
  const desc = payload.desc ? payload.desc.toString() : "";
  if (!title) errors.title = "Title is required.";
  if (!status) errors.status = "Status is required.";
  else if (!STATUS_OPTIONS.includes(status)) {
    errors.status = "Sorry, status must be 'open, in_progress' or 'closed'.";
  }
  if (desc.length > 1000) {
    errors.desc = "Description cannot exceed 1000 characters.";
    return errors;
  }
}
