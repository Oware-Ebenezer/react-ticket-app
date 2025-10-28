import { validateTicketPayload } from "../utils/validators";

const TICKETS_KEY = "tickets-db-v1";

function readDB() {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeDB(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export const ticketsServices = {
  list() {
    return readDB();
  },
  get(id) {
    const tickets = readDB().find((t) => t.id === Number(id));
    if (!tickets) throw new Error("Sorry! Ticket not found");
    return tickets;
  },
  create(payload) {
    const errors = validateTicketPayload(payload);
    if (Object.keys(errors).length) {
      const err = new Error("Validation failed");
      err.meta = errors;
      throw err;
    }
    const db = readDB();
    const now = new Date().toISOString;
    const ticket = {
      id: Date.now(),
      title: payload.title.trim(),
      status: payload.status,
      description: payload.desc ? payload.desc.trim() : "",
      priority: payload.priority || "normal",
      createdAt: now,
      updatedAt: now,
    };
    db.unshift(ticket);
    writeDB(db);
    return ticket;
  },
  update(id, patch) {
    const db = readDB();
    const idx = db.findIndex((t) => t.id === Number(id));
    if (idx === -1) throw new Error("Sorry! Ticket not found");
    const merged = {
      ...db[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    const errors = validateTicketPayload(merged);
    if (Object.keys(errors).length) {
      const err = new Error("Validation failed");
      err.meta = errors;
      throw err;
    }
  },
  remove(id) {
    const db = readDB();
    const exists = db.some((t) => t.id === Number(id));
    if (!exists) throw new Error("Sorry! Ticket not found");
    const next = db.filter((t) => t.id !== Number(id));
    writeDB(next);
    return true;
  },
};
