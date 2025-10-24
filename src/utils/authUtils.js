export const SESSION_KEY = "ticketapp_session";
export const USERS_KEY = "ticketapp_users";

export function getSession() {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

export function setSession(token) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(token));
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
