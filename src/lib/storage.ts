export function getSessionItem(key) {
  const jsonStr = window.sessionStorage.getItem(key);
  const value = JSON.parse(jsonStr);
  return value;
}

export function setSessionItem(key, value) {
  const jsonStr = JSON.stringify(value);
  sessionStorage.setItem(key, jsonStr);
}

export function removeSessionItem(key) {
  window.sessionStorage.removeItem(key);
}
