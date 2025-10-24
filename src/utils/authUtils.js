export const SESSION_KEY = "ticketapp_session";
export const USERS_KEY = "ticketapp_users";

export function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

export function setSession(token) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(token));
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function saveUsers(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
